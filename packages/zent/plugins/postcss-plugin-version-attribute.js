/* eslint-disable prefer-arrow-callback */
const postcss = require('postcss');
const parseSelector = require('postcss-selector-parser');
const parseValue = require('postcss-value-parser');
const path = require('path');
const pkg = require('../package.json');
const { KEYFRAME_NAME_PREFIX } = require('./constants');

// Only process files in zent
const WHITELIST = ['../css', '../assets'].map(p => path.resolve(__dirname, p));
const VERSION_TAG = `v${pkg.version.replace(/[^0-9a-z]/gi, 'x')}`;
const ICONFONT_NAME = 'zenticon';

module.exports = postcss.plugin('postcss-plugin-version-attribute', () => {
  const processor = parseSelector(transform);

  return root => {
    const fp = root.source.input.file;
    if (WHITELIST.every(w => !fp.startsWith(w))) {
      return;
    }

    const handlers = [];

    root.walkRules(rule => {
      handlers.push(
        processor.process(rule.selector).then(result => {
          rule.selector = result;
        })
      );

      rule.walkDecls(decl => {
        const { prop, value } = decl;
        if (prop === 'font-family' && value === ICONFONT_NAME) {
          decl.value = getVersionedIconFontName(value);
        } else if (prop === 'animation' || prop === 'animation-name') {
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
        }
      });
    });

    root.walkAtRules(atRule => {
      const { name } = atRule;
      if (name === 'font-face') {
        atRule.walkDecls('font-family', decl => {
          const { value } = decl;
          if (value === ICONFONT_NAME) {
            decl.value = getVersionedIconFontName(value);
          }
        });
      } else if (name === 'keyframes' || name.endsWith('-keyframes')) {
        atRule.params = getVersionedKeyframeName(atRule.params);
      }
    });

    return Promise.all(handlers);
  };
});

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

      // Insert a [data-zv=x.y.z] after the last class/attribute/id/tag
      let lastInterestedNode = null;
      selector.walk(node => {
        const { type } = node;
        if (
          type === parseSelector.CLASS ||
          type === parseSelector.ID ||
          type === parseSelector.ATTRIBUTE ||
          type === parseSelector.TAG
        ) {
          lastInterestedNode = node;
        }
      });
      if (lastInterestedNode) {
        lastInterestedNode.parent.insertAfter(
          lastInterestedNode,
          parseSelector.attribute({
            attribute: `data-zv="${pkg.version}"`,
          })
        );
      }
    }
  });
}

function getVersionedIconFontName(name) {
  return `${name}${VERSION_TAG}`;
}

function getVersionedKeyframeName(name) {
  return `${name}-${VERSION_TAG}`;
}
