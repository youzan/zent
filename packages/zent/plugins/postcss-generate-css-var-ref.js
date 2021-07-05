const parseValue = require('postcss-value-parser');
const path = require('path');
const fs = require('fs');

// 目前只有color存在变量一对多语义值关系
const THEME_FILES = ['_color.scss'].map(f =>
  path.resolve(__dirname, '../assets/theme/semantic', f)
);

const GENERATE_THEME_REF_FILE = path.resolve(
  __dirname,
  '../theme-css-vars.json'
);

const CSS_VAR_PREFIX = '--theme-';
const CSS_RGB_VAR_PREFIX = CSS_VAR_PREFIX + 'rgb-';

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

/**
 * This plugin runs on raw sass files, not css files.
 */
module.exports = () => {
  return {
    postcssPlugin: 'postcss-plugin-vars',
    prepare(result) {
      const variableSemanticRelation = {}; // { key -> name, value -> names[] }
      const variableForRGBSemanticRelation = {};
      let commentSemanticRelation = {};
      const sourceRelation = {}; // { key -> index, value -> name }

      if (!THEME_FILES.includes(result.root.source.input.file)) {
        return {};
      }

      return {
        async OnceExit() {
          const refsContent = {
            hex: variableSemanticRelation,
            rgb: variableForRGBSemanticRelation,
            vars: commentSemanticRelation,
          };

          return fs.promises.writeFile(
            GENERATE_THEME_REF_FILE,
            JSON.stringify(refsContent, null, 2),
            {
              encoding: 'utf-8',
            }
          );
        },

        Declaration(decl) {
          const isThemeVar = THEME_VARIABLE_NAMES.includes(decl.prop);

          if (isThemeVar) {
            const words = parseValue(decl.value);
            const prefixName = /[a-zA-Z]+[^-]/.exec(decl.prop)[0];
            let firstNodeSourceIndex;
            words.walk(node => {
              if (!firstNodeSourceIndex) {
                firstNodeSourceIndex = node.sourceIndex;
              }
              const needInsert = isColorObject(node);
              if (needInsert) {
                insertVariableRelation(
                  CSS_VAR_PREFIX,
                  prefixName,
                  node,
                  sourceRelation,
                  variableSemanticRelation
                );
                insertVariableRelation(
                  CSS_RGB_VAR_PREFIX,
                  prefixName,
                  node,
                  sourceRelation,
                  variableForRGBSemanticRelation
                );
              }
            });
            if (decl.raws && decl.raws.value) {
              const cssVarPrefixName = generateCSSVarPrefixName(
                CSS_VAR_PREFIX,
                prefixName,
                sourceRelation,
                firstNodeSourceIndex
              );
              const themeComments = generateComments(
                cssVarPrefixName,
                decl.raws.value
              );
              commentSemanticRelation = {
                ...commentSemanticRelation,
                ...themeComments,
              };
            }
          }
        },
      };
    },
  };
};

function isColorObject(node) {
  const { type, nodes = [] } = node;
  if (type === 'function') {
    if (nodes.length) {
      return true;
    }
  }
}

function generateCSSVarPrefixName(
  cssVarPrefix,
  prefixName,
  sourceRelation,
  sourceIndex
) {
  const variablePrefixName = sourceRelation[sourceIndex] || prefixName || '';

  return variablePrefixName
    ? `${cssVarPrefix}${variablePrefixName}-`
    : `${cssVarPrefix}`;
}

function generateComments(cssVarPrefixName, value) {
  const scss = value.scss;
  const variablePattern = /.*'(.+)'.*(\$[a-zA-Z0-9-]+).*$/;
  const commentPattern = /\/\/(.+)/;
  const cssVariableInfos = scss.split('\n');
  const themeComments = {};
  for (
    let commentIndex = 0, variableIndex = 1, infoLen = cssVariableInfos.length;
    variableIndex <= infoLen;

  ) {
    const comment = commentPattern.exec(cssVariableInfos[commentIndex]);
    const variablePair = variablePattern.exec(cssVariableInfos[variableIndex]);

    if (comment && variablePair) {
      themeComments[cssVarPrefixName + variablePair[1]] = {
        comment: comment[1],
      };
    }
    commentIndex++;
    variableIndex++;
  }
  return themeComments;
}

// 适配现有逻辑，深度为2
function insertVariableRelation(
  cssVarPrefix,
  prefixName,
  node,
  sourceRelation,
  variableSemanticRelation
) {
  const nodes = node.nodes;
  const matchedNodes = nodes.filter(node =>
    ['string', 'word', 'function'].includes(node.type)
  );

  const cssVarPrefixName = generateCSSVarPrefixName(
    cssVarPrefix,
    prefixName,
    sourceRelation,
    node.sourceIndex
  );

  for (let i = 0; i < matchedNodes.length - 1; i = i + 2) {
    const name = /[^$]+/.exec(matchedNodes[i].value)[0];
    const value = matchedNodes[i + 1];
    if (value.type === 'word') {
      const basicName = value.value;

      const refName = `${cssVarPrefixName}${name}`;

      if (!variableSemanticRelation[basicName]) {
        variableSemanticRelation[basicName] = [];
      }

      variableSemanticRelation[basicName].push(refName);
    }
    if (value.type === 'function') {
      sourceRelation[value.sourceIndex] = name;
    }
  }
}
