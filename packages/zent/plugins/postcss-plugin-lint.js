const parseValue = require('postcss-value-parser');
const path = require('path');
const { KEYFRAME_NAME_PREFIX } = require('./constants');

const THEME_FILES = [
  '_default.scss',
  '_override.scss',
  '_raw-vars.scss',
  'semantic/_box.scss',
  'semantic/_color.scss',
  'semantic/_text.scss',
].map(f => path.resolve(__dirname, '../assets/theme', f));

const ErrorMessages = {
  color: 'raw colors not allowed, use color mixin in theme/default',
};

/**
 * This plugin runs on raw sass files, not css files.
 */
module.exports = () => {
  return {
    postcssPlugin: 'postcss-plugin-lint',
    prepare() {
      let allowRawColor = false;

      return {
        Root(root) {
          allowRawColor = THEME_FILES.includes(root.source.input.file);
        },

        AtRule: {
          keyframes(atRule) {
            const { params } = atRule;
            if (!params.startsWith(KEYFRAME_NAME_PREFIX)) {
              throw atRule.error(
                `keyframes name must start with '${KEYFRAME_NAME_PREFIX}'`,
                {
                  word: params,
                }
              );
            }
          },
        },

        Declaration(decl) {
          const words = parseValue(decl.value);
          words.walk(node => {
            if (!allowRawColor && isRawColor(node)) {
              throw decl.error(ErrorMessages.color, {
                word: node.value,
              });
            }
          });
        },
      };
    },
  };
};
module.exports.postcss = true;

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
