/* eslint-disable prefer-arrow-callback */
const postcss = require('postcss');
const parseValue = require('postcss-value-parser');
const path = require('path');
const { KEYFRAME_NAME_PREFIX } = require('./constants');

const THEME_FILE = path.resolve(__dirname, '../assets/theme/_default.scss');

const ErrorMessages = {
  color: 'raw colors not allowed, use color variables in theme/default',
};

/**
 * This plugin runs on raw sass files, not css files.
 */
module.exports = postcss.plugin('postcss-plugin-lint', () => {
  return root => {
    root.walkAtRules(atRule => {
      const { name, params } = atRule;
      if (name === 'keyframes' && !params.startsWith(KEYFRAME_NAME_PREFIX)) {
        throw atRule.error(
          `keyframes name must start with '${KEYFRAME_NAME_PREFIX}'`,
          {
            word: params,
          }
        );
      }
    });

    const isThemeFile = THEME_FILE === root.source.input.file;
    root.walkDecls(decl => {
      const words = parseValue(decl.value);
      words.walk(node => {
        if (isRawColor(node) && !isThemeFile) {
          throw decl.error(ErrorMessages.color, {
            word: node.value,
          });
        }
      });
    });
  };
});

function isRawColor(node) {
  const { type, value } = node;
  if (type === 'function') {
    if (value === 'rgb') {
      return true;
    }

    // allow sass function rgba(black, 0.5), but not rgba(24, 34, 56, 0.5)
    if (value === 'rgba') {
      const argc = node.nodes.reduce(
        (c, n) => (n.type !== 'div' ? c + 1 : c),
        0
      );
      return argc !== 2;
    }
  }

  // no hex colors, but color names like black are allowed
  if (type === 'word') {
    return /^#([0-9a-f]{3}|[0-9a-f]{6})$/.test(value);
  }
}
