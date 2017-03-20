var babylon = require('babylon');
var types = require('babel-types');
var helper = require('./helper');

var traverse = helper.interopRequireDefault(require('babel-traverse')).default;
var template = helper.interopRequireDefault(require('babel-template')).default;

var demoBodyTemplate = template(`
  (function() {
    BODY
    return REACT_NODE;
  })();
`);

function isReactDOMRenderMemberExpression(node) {
  return types.isMemberExpression(node) &&
    types.isIdentifier(node.object, { name: 'ReactDOM' }) &&
    types.isIdentifier(node.property, { name: 'render' });
}

function isReactDOMRenderCallExpressionStatement(node) {
  return types.isExpressionStatement(node) &&
    types.isCallExpression(node.expression) &&
    isReactDOMRenderMemberExpression(node.expression.callee);
}

function getReactDOMRenderNodeArgument(node) {
  return node.expression.arguments[0];
}

module.exports = function compileCode(code) {
  var ast = babylon.parse(code, {
    sourceType: 'module',
    plugins: ['jsx']
  });
  var imports = [];
  var reactNode;

  traverse(ast, {
    enter: function (path) {
      var node = path.node;
      if (types.isImportDeclaration(node)) {
        imports.push(node);
        path.remove();
      } else if (isReactDOMRenderCallExpressionStatement(node)) {
        reactNode = getReactDOMRenderNodeArgument(node);
        path.remove();
      }
    }
  });

  var demo = demoBodyTemplate({
    BODY: ast,
    REACT_NODE: reactNode
  });

  return {
    body: helper.generateCode(demo),
    imports: imports,
    src: code
  };
}
