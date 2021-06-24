/* eslint-disable prefer-arrow-callback */
const postcss = require('postcss');
const parseValue = require('postcss-value-parser');
const path = require('path');
const fs = require('fs');

// 目前只有color存在变量一对多语义值关系
const THEME_FILES = ['_color.scss'].map(f =>
  path.resolve(__dirname, '../assets/theme/semantic', f)
);

const GENERATE_THEME_REF_SCSS_FILE = path.resolve(
  __dirname,
  '../assets/theme/_css-var-ref.scss'
);

const GENERATE_THEME_REF_FILE = path.resolve(
  __dirname,
  '../src/theme/css-var-ref.ts'
);

const CSS_VAR_PREFIX = '--theme-';
const CSS_RGB_VAR_PREFIX = CSS_VAR_PREFIX + 'rgb-';
const FILE_NOTES = `/**
 *  Auto generated by \`plugins/postcss-generate-css-var-ref.js\`.
 *  DO NOT EDIT
 *  描述变量到 css variable 的一对多关系，便于获取变量所涵盖的 css variable，进行批量替换
 */`;

const THEME_VARIABLE_NAMES = [
  '$title-colors',
  '$hint-colors',
  '$disabled-colors',
  '$section-colors',
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

const variableSemanticRelation = {}; // { key -> name, value -> names[] }
const variableForRGBSemanticRelation = {};
const sourceRelation = {}; // { key -> index, value -> name }

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
      const isThemeVar = THEME_VARIABLE_NAMES.includes(decl.prop);
      if (isThemeFile && isThemeVar) {
        const words = parseValue(decl.value);
        const prefixName = /[a-zA-Z]+[^-]/.exec(decl.prop)[0];
        words.walk(node => {
          const needInsert = isColorObject(node);
          if (needInsert) {
            insertVariableRelation(
              prefixName,
              node,
              variableSemanticRelation,
              sourceRelation,
              CSS_VAR_PREFIX
            );
            insertVariableRelation(
              prefixName,
              node,
              variableForRGBSemanticRelation,
              sourceRelation,
              CSS_RGB_VAR_PREFIX
            );
          }
        });
        fs.writeFileSync(
          GENERATE_THEME_REF_FILE,
          `${FILE_NOTES}

export const cssVarRef = ${stringify(variableSemanticRelation)};\n
export const cssRgbVarRef = ${stringify(variableForRGBSemanticRelation)};\n`,
          { encoding: 'utf-8' }
        );
      }
    });
  };
});

function isColorObject(node) {
  const { type, nodes = [] } = node;
  if (type === 'function') {
    if (nodes.length) {
      return true;
    }
  }
}

// 适配现有逻辑，深度为2
function insertVariableRelation(
  prefixName,
  node,
  variableSemanticRelation,
  sourceRelation,
  cssVarPrefix
) {
  const nodes = node.nodes;
  const matchedNodes = nodes.filter(node =>
    ['string', 'word', 'function'].includes(node.type)
  );

  const variablePrefixName =
    sourceRelation[node.sourceIndex] || prefixName || '';

  for (let i = 0; i < matchedNodes.length - 1; i = i + 2) {
    const name = /[^\$]+/.exec(matchedNodes[i].value)[0];
    const value = matchedNodes[i + 1];
    if (value.type === 'word') {
      const basicName = value.value;

      const refName = variablePrefixName
        ? `${cssVarPrefix}${variablePrefixName}-${name}`
        : `${cssVarPrefix}${name}`;

      if (!variableSemanticRelation[basicName]) {
        variableSemanticRelation[basicName] = [];
      }

      variableSemanticRelation[basicName].push(refName);
    }
    if (value.type === 'function') {
      sourceRelation[value.sourceIndex] = name;
    }
  }
  return;
}
