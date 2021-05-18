/* eslint-disable prefer-arrow-callback */
const postcss = require('postcss');
const parseValue = require('postcss-value-parser');
const path = require('path');
const fs = require('fs');
// const { KEYFRAME_NAME_PREFIX } = require('./constants');

const THEME_FILES = ['_color.scss'].map(f =>
  path.resolve(__dirname, '../assets/theme/variables', f)
);

const BRAND_NAME = '$colors';
const varsMap = {}; // name -> names[]
const sourceMap = {}; // index -> name

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
      const isBrand = BRAND_NAME === decl.prop;
      if (isThemeFile && isBrand) {
        const words = parseValue(decl.value);
        words.walk(node => {
          const isStateArr = isColorState(node);
          if (isStateArr) {
            buildParent(node, varsMap, sourceMap);
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
function buildParent(node, varsMap, sourceMap) {
  const nodes = node.nodes;
  const prueNodes = nodes.filter(node =>
    ['word', 'function'].includes(node.type)
  );

  const parentName = sourceMap[node.sourceIndex] || '';

  for (let i = 0; i < prueNodes.length - 1; i = i + 2) {
    const name = /[^\$]+/.exec(prueNodes[i].value)?.[0];
    const value = prueNodes[i + 1];
    if (value.type === 'word') {
      const basicName = value.value;
      const isBasicVar = /^\$brand-/.test(basicName);

      if (!isBasicVar) {
        return;
      }

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
