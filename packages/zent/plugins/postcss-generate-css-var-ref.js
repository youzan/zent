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

const writeScssFile = variableSemanticRelation => {
  const generateSetsOfCssVariables = (variableName, cssVariables) => {
    const cssVariablesStr = cssVariables
      .map(cssVar => `'${cssVar}'`)
      .join(',\n    ');
    return `\n  '${variableName}': (\n    ${cssVariablesStr}\n  )`;
  };

  const variables = Object.keys(variableSemanticRelation);

  const variableSemanticRelationStr = variables
    .map(variable =>
      generateSetsOfCssVariables(variable, variableSemanticRelation[variable])
    )
    .join(',');

  fs.writeFileSync(
    GENERATE_THEME_REF_SCSS_FILE,
    `// 由插件 plugins/postcss-generate-css-var-ref 遍历 'assets/theme/semantic/' 下scss文件生成
// 描述变量到 css variable 的一对多关系，便于获取变量所涵盖的 css variable，进行批量替换

$css-var-refs: (${variableSemanticRelationStr}\n);`,
    { encoding: 'utf-8' }
  );
};

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
          `// 由插件 plugins/postcss-generate-css-var-ref 遍历 'assets/theme/semantic/' 下scss文件生成
// 描述变量到 css variable 的一对多关系，便于获取变量所涵盖的 css variable，进行批量替换

export const cssVarRef = ${stringify(variableSemanticRelation)}`,
          { encoding: 'utf-8' }
        );
        writeScssFile(variableSemanticRelation);
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
