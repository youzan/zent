const path = require('path');
const fs = require('fs').promises;
const https = require('https');
const { URL } = require('url');
const cheerio = require('cheerio');
const glob = require('glob');
const { exit } = require('process');

const FILES = glob.sync('**/*.md', {
  cwd: path.resolve(__dirname, '../src'),
  absolute: true,
});

const APIDOC_REGEXP = /[./]+\/(apidoc\/.+?|apidoc\/?)\)/g;

async function getApiDocLinks(file) {
  const content = await fs.readFile(file, { encoding: 'utf-8' });
  const matches = content.matchAll(APIDOC_REGEXP);

  return Array.from(matches).map(m => {
    const p = m[1];

    // Normalize root path
    return p.endsWith('apidoc') ? p + '/' : p;
  });
}

async function main() {
  const links = await Promise.all(FILES.map(getApiDocLinks));
  const uniqLinks = Array.from(new Set(links.flat()));

  const linkGroups = groupLinksByPath(uniqLinks);
  const linksToRequest = Object.keys(linkGroups);
  const limit = pLimit(5);
  const docs = await Promise.allSettled(
    linksToRequest.map(link => {
      return limit(requestApiDoc, link);
    })
  );

  let hasDeadLinks = false;
  docs.forEach(({ status, reason, value }, index) => {
    const link = linksToRequest[index];
    const hashesInDoc = linkGroups[link];

    if (status === 'rejected') {
      hasDeadLinks = true;

      const msg =
        reason?.statusCode ?? reason?.toString() ?? 'Unknown network error';

      if (hashesInDoc.length === 0) {
        console.error(link, red(msg));
      } else {
        hashesInDoc.forEach(hash => {
          const url = `${link}${hash}`;
          console.error(url, red(msg));
        });
      }
      return;
    }

    if (hashesInDoc.length === 0) {
      console.log(link, green('OK'));
    } else {
      const $ = cheerio.load(value);
      hashesInDoc.forEach(hash => {
        const url = `${link}${hash}`;
        if (!$(`a[name="${hash.slice(1)}"]`).length) {
          hasDeadLinks = true;
          console.error(url, red('Hash missing'));
        } else {
          console.log(url, green('OK'));
        }
      });
    }
  });

  if (hasDeadLinks) {
    exit(1);
  }
}

function groupLinksByPath(paths) {
  return paths.reduce((groups, urlPath) => {
    const url = new URL(`https://youzan.github.io/zent/${urlPath}`);
    const { hash, pathname } = url;
    if (!groups[pathname]) {
      groups[pathname] = [];
    }
    if (hash) {
      groups[pathname].push(hash);
    }
    return groups;
  }, {});
}

function requestApiDoc(requestPath) {
  const options = {
    host: 'youzan.github.io',
    port: 443,
    path: requestPath,
    method: 'GET',
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      if (res.statusCode !== 200) {
        reject(res);
      }

      let data = '';
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end', function () {
        resolve(data);
      });
    });

    req.on('error', error => {
      reject(error);
    });

    req.end();
  });
}

function red(msg) {
  return `\x1b[41m${msg}\x1b[0m`;
}

function green(msg) {
  return `\x1b[42m${msg}\x1b[0m`;
}

/**
 * Limit promise queue concurrency
 */
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

  const run = async (fn, resolve, reject, args) => {
    activeCount++;

    const result = (async () => fn(...args))();

    resolve(result);

    try {
      await result;
    } catch (err) {
      reject(err);
    }

    next();
  };

  const enqueue = (fn, resolve, reject, args) => {
    queue.unshift(run.bind(undefined, fn, resolve, reject, args));

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
    new Promise((resolve, reject) => {
      enqueue(fn, resolve, reject, args);
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
