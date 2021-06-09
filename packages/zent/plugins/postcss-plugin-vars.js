/* eslint-disable prefer-arrow-callback */
const postcss = require('postcss');
const parseValue = require('postcss-value-parser');
const path = require('path');
const fs = require('fs');

const THEME_FILES = ['_color.scss'].map(f =>
  path.resolve(__dirname, '../assets/theme/variables', f)
);

const BRAND_NAME = [
  '$body-colors',
  '$success-colors',
  '$warning-colors',
  '$danger-colors',
  '$link-colors',
  '$default-colors',
  '$primary-colors',
  '$weak-link-colors',
  '$rate-colors',
];
const varsMap = {}; // { key -> name, value -> names[] }
const sourceMap = {}; // { key -> index, value -> name }

function stringify(arg) {
  return JSON.stringify(
    arg,
    (_key, value) => {
      if (Object.prototype.toString.call(value) === '[object Set]') {
        return [...value];
      }
      return value;
    },
    2
  );
}

/**
 * This plugin runs on raw sass files, not css files.
 */
module.exports = postcss.plugin('postcss-plugin-vars', () => {
  return root => {
    const isThemeFile = THEME_FILES.includes(root.source.input.file);
    root.walkDecls(decl => {
      const isBrand = BRAND_NAME.includes(decl.prop);
      if (isThemeFile && isBrand) {
        const words = parseValue(decl.value);
        const prefixName = /[a-zA-Z]+[^-]/.exec(decl.prop)[0];
        words.walk(node => {
          const isStateArr = isColorState(node);
          if (isStateArr) {
            buildParent(prefixName, node, varsMap, sourceMap);
          }
        });
        fs.writeFileSync(
          path.resolve(__dirname, '../src/color/theme-ref.ts'),
          `export const themeRefs = ${stringify(varsMap)}`,
          { encoding: 'utf-8' }
        );
      }
    });
  };
});

function isColorState(node) {
  const { type, nodes = [] } = node;
  if (type === 'function') {
    if (nodes.length) {
      return true;
    }
  }
}

// 适配现有，深度为2
function buildParent(prefixName, node, varsMap, sourceMap) {
  const nodes = node.nodes;
  const matchedNodes = nodes.filter(node =>
    ['string', 'word', 'function'].includes(node.type)
  );

  const parentName = sourceMap[node.sourceIndex] || prefixName || '';

  for (let i = 0; i < matchedNodes.length - 1; i = i + 2) {
    const name = /[^\$]+/.exec(matchedNodes[i].value)?.[0];
    const value = matchedNodes[i + 1];
    if (value.type === 'word') {
      const basicName = value.value;

      const refName = parentName ? parentName + '-' + name : name;

      if (!varsMap[basicName]) {
        varsMap[basicName] = [];
      }

      varsMap[basicName].push(refName);
    }
    if (value.type === 'function') {
      sourceMap[value.sourceIndex] = name;
    }
  }
  return;
}
