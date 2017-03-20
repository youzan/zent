/* eslint-disable */

var _ = require('lodash');

exports.createRoot = function createRoot() {
  return {
    type: 'root',
    children: []
  };
};

exports.addChild = function addChild(root, child) {
  root.children.push(_.cloneDeep(child));
};
