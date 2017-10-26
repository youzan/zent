import flatten from 'lodash/flatten';

function extractError(resp) {
  if (!resp) {
    return '未知错误';
  }

  if (resp.msg) {
    return resp.msg;
  }

  if (resp.name && resp.message) {
    return `${resp.name}: ${resp.message}`;
  }

  if (resp.toString) {
    return resp.toString();
  }

  if (resp.toJSON) {
    return resp.toJSON();
  }

  return '格式化错误信息出错';
}

export default function getRequestError(...maybeResponse) {
  return flatten(maybeResponse)
    .map(extractError)
    .join('\n');
}
