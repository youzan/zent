/* eslint-disable */

var visit = require('unist-util-visit');
var isStyleNode = require('hast-util-is-css-style');
var getText = require('hast-util-to-string');
var unified = require('unified');
var rehypeParser = require('rehype-parse');
var rehypeStringify = require('rehype-stringify');
var helper = require('./helper');

var htmlParser = unified()
  .use(rehypeParser, { fragment: true })
  .use(rehypeStringify)
  .freeze();

module.exports = function consolidateStyles(roots) {
  var styleArray = roots.reduce(function (styles, r) {
    visit(r, 'html', function(node, rindex, rparent) {
      var htmlTree = htmlParser.parse(node.value);

      visit(htmlTree, 'element', function(hnode, index, parent) {
        if (isStyleNode(hnode)) {
          // remove style from html
          parent.children.splice(index, 1);

          var sText = getText(hnode).trim();
          if (sText) {
            styles.push(sText);
          }
        }
      });

      // remove empty html if contains only styles
      var htmlWithNoStyle = htmlParser.stringify(htmlTree).trim();
      if (htmlWithNoStyle) {
        rparent.children[rindex].value = htmlWithNoStyle;
      } else {
        rparent.children.splice(rindex, 1);
      }
    });

    return styles;
  }, []);

  var styleText = styleArray.join('\n\n');
  var styleRoot = helper.createRoot();
  helper.addChild(styleRoot, {
    type: 'style',
    value: styleText
  });
  roots.unshift(styleRoot);

  return roots;
};
