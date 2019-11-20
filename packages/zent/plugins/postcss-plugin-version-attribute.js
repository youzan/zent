/* eslint-disable prefer-arrow-callback */
const postcss = require('postcss');
const parseSelector = require('postcss-selector-parser');
const path = require('path');
const pkg = require('../package.json');

// Only process files in zent
const WHITELIST = ['../css', '../assets'].map(p => path.resolve(__dirname, p));

module.exports = postcss.plugin('postcss-plugin-constants', () => {
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
