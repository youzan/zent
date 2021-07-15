const parseSelector = require('postcss-selector-parser');
const parseValue = require('postcss-value-parser');
const pkg = require('../package.json');
const { KEYFRAME_NAME_PREFIX } = require('./constants');

const VERSION_TAG = `v${pkg.version.replace(/[^0-9a-z]/gi, 'x')}`;
const ICONFONT_NAME = 'zenticon';

module.exports = () => {
  return {
    postcssPlugin: 'postcss-plugin-version-attribute',
    prepare() {
      const handleAnimationDecl = decl => {
        const { value } = decl;
        const words = parseValue(value);
        let modified = false;
        words.walk(node => {
          if (
            node.type === 'word' &&
            node.value.startsWith(KEYFRAME_NAME_PREFIX)
          ) {
            node.value = getVersionedKeyframeName(node.value);
            modified = true;
          }
        });
        if (modified) {
          decl.value = words.toString();
        }
      };

      const processor = parseSelector(transform);

      return {
        Rule(rule) {
          const { selector } = rule;
          if (selector.indexOf(getVersionedAttribute()) === -1) {
            rule.selector = processor.processSync(selector);
          }
        },

        AtRule: {
          keyframes(atRule) {
            atRule.params = getVersionedKeyframeName(atRule.params);
          },
        },

        Declaration: {
          'font-family': decl => {
            const { value } = decl;
            if (value === ICONFONT_NAME) {
              decl.value = getVersionedIconFontName(value);
            }
          },

          animation: handleAnimationDecl,
          'animation-name': handleAnimationDecl,
        },
      };
    },
  };
};
module.exports.postcss = true;

function transform(selectors) {
  selectors.each(selector => {
    if (selector.type === parseSelector.SELECTOR) {
      // Must contain at least one class or id
      // body.foobar, html.foobar are not handled as they won't appear in a library
      let skip = true;
      selector.walk(node => {
        const { type } = node;
        if (type === parseSelector.CLASS || type === parseSelector.ID) {
          skip = false;
        }
      });
      if (skip) {
        return;
      }

      // Insert a [data-zv=x.y.z] after the first class/attribute/id/tag
      let interestedNode = null;
      selector.walk(node => {
        const { type } = node;
        if (
          type === parseSelector.CLASS ||
          type === parseSelector.ID ||
          type === parseSelector.ATTRIBUTE ||
          type === parseSelector.TAG
        ) {
          interestedNode = node;
          return false; /* break */
        }
      });
      if (interestedNode) {
        interestedNode.parent.insertAfter(
          interestedNode,
          parseSelector.attribute({
            attribute: getVersionedAttribute(),
          })
        );
      }
    }
  });
}

function getVersionedAttribute() {
  return `data-zv="${pkg.version}"`;
}

function getVersionedIconFontName(name) {
  return name.endsWith(VERSION_TAG) ? name : `${name}${VERSION_TAG}`;
}

function getVersionedKeyframeName(name) {
  return name.endsWith(VERSION_TAG) ? name : `${name}-${VERSION_TAG}`;
}
