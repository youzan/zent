import { transform } from 'babel-core';

import pluginZent from '../lib';

function compile(code, options) {
  try {
    const c = transform(code, {
      babelrc: false,
      presets: [
        [
          'env',
          {
            targets: {
              node: 4
            }
          }
        ]
      ],

      plugins: [
        [
          pluginZent,
          Object.assign(
            { moduleMappingFile: '../../zent/lib/module-mapping.json' },
            options
          )
        ]
      ]
    }).code;

    console.log(c); // eslint-disable-line
  } catch (ex) {
    console.error(ex); // eslint-disable-line
  }
}

const codeBlocks = [
  "import 'zent'",
  "import * as Zent from 'zent'",
  "import Zent from 'zent'",
  "import Zent, { Button } from 'zent'",
  "require('zent')",

  "import { Button, Dialog } from 'zent'",
  "import 'zent/css/index.css'"
];

codeBlocks.forEach(compile);

compile("import { Pop, Button, Portal } from 'zent'", {
  automaticStyleImport: true
});

const noop = () => {};
const describe = noop;
const it = noop;
const expect = noop;

describe('babel-plugin-zent', () => {
  it('throws on side-effect only import', () => {
    expect(() => compile("import 'zent'")).toThrowError(
      /Side-effect only import is allowed in zent/
    );
  });

  it('throws on namespace import', () => {
    expect(() => compile("import * as Zent from 'zent'")).toThrowError(
      /Namespace import is not allowd in zent/
    );
  });

  it('throws on default import', () => {
    const defaultImportErrorRegexp = /There is no default export in zent/;
    expect(() => compile("import Zent from 'zent'")).toThrowError(
      defaultImportErrorRegexp
    );
    expect(() => compile("import Zent, { Button } from 'zent'")).toThrowError(
      defaultImportErrorRegexp
    );
  });

  it('throws on require', () => {
    expect(() => compile("require('zent')")).toThrowError(
      /require('zent') is not allowed/
    );
  });

  it('transforms component imports', () => {
    // eslint-disable-next-line
    const rules = require('../../zent/lib/module-mapping.json');

    Object.keys(rules).forEach(component => {
      const src = `import { ${component} } from 'zent'`;
      expect(compile(src)).stringContaining(
        `require('${rules[component].js}')`
      );
    });
  });

  it('can add css imports', () => {
    expect(
      compile("import { Button } from 'zent'", { automaticStyleImport: true })
    ).stringContaining("require('zent/css/button.css')");

    expect(
      compile("import { Portal } from 'zent'", { automaticStyleImport: true })
    ).not.stringContaining('zent/css/');

    expect(compile("import { Pop, Button } from 'zent'"), {
      automaticStyleImport: true
    }).stringMatching(
      /require\('zent\/css\/pop.css'\).+require\('zent\/css\/button.css'\)/gi
    );
  });
});
