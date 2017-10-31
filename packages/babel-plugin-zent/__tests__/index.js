import { transform } from 'babel-core';

import pluginZent from '../src';

function compile(code, options) {
  return transform(code, {
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
}

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
      /require\('zent'\) is not allowed/
    );
  });

  it('transforms component imports', () => {
    // eslint-disable-next-line
    const rules = require('../../zent/lib/module-mapping.json');

    Object.keys(rules).forEach(component => {
      const src = `import { ${component} } from 'zent'`;
      expect(
        compile(src).indexOf(`require('${rules[component].js}')`)
      ).not.toBe(-1);
    });

    // rename imports
    expect(
      compile("import { Button as Foobar } from 'zent'; console.log(Foobar)")
    ).toMatch(/console.log(.+\.default)/);
  });

  it('can add css imports', () => {
    expect(
      compile("import { Button } from 'zent'", { automaticStyleImport: true })
    ).toMatch(/require\('zent\/css\/button.css'\)/);

    expect(
      compile("import { Portal } from 'zent'", { automaticStyleImport: true })
    ).toMatch(/require\('zent\/css\/base.css'\)/);

    expect(
      compile("import { Pop, Button } from 'zent'", {
        automaticStyleImport: true
      })
    ).toMatch(
      /require\('zent\/css\/button.css'\)[\s\S]*require\('zent\/css\/pop.css'\)/im
    );
  });

  it('can add postcss imports', () => {
    expect(
      compile("import { Button } from 'zent'", {
        automaticStyleImport: true,
        useRawStyle: true
      })
    ).toMatch(/require\('zent\/assets\/button.pcss'\)/);

    expect(
      compile("import { Portal } from 'zent'", {
        automaticStyleImport: true,
        useRawStyle: true
      })
    ).toMatch(/require\('zent\/assets\/base.pcss'\)/);

    expect(
      compile("import { Pop, Button } from 'zent'", {
        automaticStyleImport: true,
        useRawStyle: true
      })
    ).toMatch(
      /require\('zent\/assets\/button.pcss'\)[\s\S]*require\('zent\/assets\/pop.pcss'\)/im
    );
  });
});
