function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var generate = _interopRequireDefault(require('babel-generator')).default;

exports.interopRequireDefault = _interopRequireDefault;

exports.generateCode = function generateCode(ast) {
  return generate(ast, {
    retainFunctionParens: true
  }).code;
}
