/**
 * Generate all possible icon types
 */

const icons = require('zenticons/lib/codes.json');
const fs = require('fs');
const path = require('path');

const AUTO_GENERATE_REGEXP =
  /(\/\* auto-generate: start \*\/)\n([\s\S]+)\n(\/\* auto-generate: end \*\/)/g;
const SRC = path.resolve(__dirname, '../src/icon/Icon.tsx');

function main() {
  const iconNames = icons.map(i => `'${i.name}'`);
  iconNames.sort();
  iconNames.unshift('export type IconType =');
  const tsType = `${iconNames.join('\n  | ')};`;

  const iconSrc = fs.readFileSync(SRC, { encoding: 'utf-8' });
  const replacedIconSrc = iconSrc.replace(
    AUTO_GENERATE_REGEXP,
    (a, p1, p2, p3) => `${p1}\n${tsType}\n${p3}`
  );

  if (iconSrc !== replacedIconSrc) {
    fs.writeFileSync(SRC, replacedIconSrc, { encoding: 'utf-8' });
  }
}

main();
