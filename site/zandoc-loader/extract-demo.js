/* eslint-disable */

var removePosition = require('unist-util-remove-position');
var inspect = require('unist-util-inspect');
var _ = require('lodash');
var helper = require('./helper');

function isParagraph(node, textPredicate) {
  return node.type === 'paragraph' &&
    node.children && node.children[0] && node.children[0].type === 'text' && textPredicate(node.children[0].value);
}

function isDemoStartText(text) {
  return /^\s*:::\s*demo/i.test(text);
}

function isDemoEndText(text) {
  return /^\s*:::\s*$/i.test(text);
}

function getDemoTitle(text) {
  var m = /^\s*:::\s*demo\s+(.+)$/i.exec(text);
  return m && m[1] || '';
}

function isDemoAtIndex(nodes, index) {
  var nodeCount = nodes.length;
  var node;

  return index < nodeCount && (node = nodes[index], node) && isParagraph(node, isDemoStartText) &&
    index + 1 < nodeCount && (node = nodes[index + 1], node) && node.type === 'code' &&
    index + 2 < nodeCount && (node = nodes[index + 2], node) && isParagraph(node, isDemoEndText);
}

function getDemo(nodes, i) {
  var demo = nodes[i + 1];
  demo.title = getDemoTitle(nodes[i].children[0].value);
  return demo;
}

module.exports = function transformer(tree) {
  removePosition(tree, true);

  var roots = [];
  var contentRoot, demoRoot;
  var nodes = tree.children;
  var numberOfTopLevelNodes = nodes.length;
  var i = 0;

  function addDemo(demo) {
    if (!demoRoot) {
      demoRoot = helper.createRoot();
    }

    helper.addChild(demoRoot, demo);
  }

  function addContent(content) {
    if (!contentRoot) {
      contentRoot = helper.createRoot();
    }

    helper.addChild(contentRoot, content);
  }

  function saveRoot(r) {
    if (r) {
      roots.push(r);
    }
  }

  while (i < numberOfTopLevelNodes) {
    if (isDemoAtIndex(nodes, i)) {
      saveRoot(contentRoot);
      contentRoot = undefined;
      addDemo(getDemo(nodes, i));
      i += 3;
    } else {
      saveRoot(demoRoot);
      demoRoot = undefined;
      addContent(nodes[i]);
      i++;
    }
  }
  // save the last section
  saveRoot(contentRoot);
  saveRoot(demoRoot);

  return roots;
};
