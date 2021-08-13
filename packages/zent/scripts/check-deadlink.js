const path = require('path');
const fs = require('fs').promises;
const https = require('https');

const FILES = ['src/form/README_zh-CN.md', 'src/form/README_en-US.md'].map(f =>
  path.resolve(__dirname, '..', f)
);

const APIDOC_REGEXP = /[./]*(apidoc\/.+?)\)/g;

async function getApiDocLinks(file) {
  const content = await fs.readFile(file, { encoding: 'utf-8' });
  const matches = content.matchAll(APIDOC_REGEXP);

  return Array.from(matches).map(m => m[1]);
}

async function main() {
  const links = await Promise.all(FILES.map(getApiDocLinks));
  const uniqLinks = Array.from(new Set(links.flat()));
  const limit = pLimit(5);
  const resp = await Promise.allSettled(
    uniqLinks.map(link => {
      return limit(requestApiDoc, link);
    })
  );
  resp.forEach(({ value: r }, index) => {
    if (!r || r instanceof Error || r.statusCode !== 200) {
      console.log(uniqLinks[index], r.statusCode);
    }
  });
}

function requestApiDoc(path) {
  const options = {
    host: 'youzan.github.io',
    port: 443,
    path: `/zent/${path}`,
    method: 'HEAD',
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      resolve(res);
    });

    req.on('error', error => {
      reject(error);
    });

    req.end();
  });
}

function pLimit(concurrency) {
  if (
    !(
      (Number.isInteger(concurrency) ||
        concurrency === Number.POSITIVE_INFINITY) &&
      concurrency > 0
    )
  ) {
    throw new TypeError('Expected `concurrency` to be a number from 1 and up');
  }

  const queue = [];
  let activeCount = 0;

  const next = () => {
    activeCount--;

    if (queue.length > 0) {
      queue.shift()();
    }
  };

  const run = async (fn, resolve, args) => {
    activeCount++;

    const result = (async () => fn(...args))();

    resolve(result);

    try {
      await result;
    } catch (err) {
      console.log(err);
    }

    next();
  };

  const enqueue = (fn, resolve, args) => {
    queue.unshift(run.bind(undefined, fn, resolve, args));

    (async () => {
      // This function needs to wait until the next microtask before comparing
      // `activeCount` to `concurrency`, because `activeCount` is updated asynchronously
      // when the run function is dequeued and called. The comparison in the if-statement
      // needs to happen asynchronously as well to get an up-to-date value for `activeCount`.
      await Promise.resolve();

      if (activeCount < concurrency && queue.length > 0) {
        queue.shift()();
      }
    })();
  };

  const generator = (fn, ...args) =>
    new Promise(resolve => {
      enqueue(fn, resolve, args);
    });

  Object.defineProperties(generator, {
    activeCount: {
      get: () => activeCount,
    },
    pendingCount: {
      get: () => queue.length,
    },
    clearQueue: {
      value: () => {
        queue.length = 0;
      },
    },
  });

  return generator;
}

main();
