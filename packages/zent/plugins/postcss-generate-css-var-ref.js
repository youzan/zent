/* eslint-disable prefer-arrow-callback */
const postcss = require('postcss');
const parseValue = require('postcss-value-parser');
const path = require('path');
const fs = require('fs');

// 目前只有color存在变量一对多语义值关系
const THEME_FILES = ['_color.scss'].map(f =>
  path.resolve(__dirname, '../assets/theme/semantic', f)
);

const GENERATE_THEME_REF_FILE = path.resolve(
  __dirname,
  '../src/theme/css-var-ref.ts'
);

const CSS_VAR_PREFIX = '--theme-';

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
              sourceRelation
            );
          }
        });
        fs.writeFileSync(
          GENERATE_THEME_REF_FILE,
          `// This is been generate from pulgins/postcss-generate-css-var-ref
// This is the reference between raw variables and semantic css variable

export const cssVarRef = ${stringify(variableSemanticRelation)}`,
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
  sourceRelation
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
        ? `${CSS_VAR_PREFIX}${variablePrefixName}-${name}`
        : `${CSS_VAR_PREFIX}${name}`;

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
