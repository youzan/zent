export const NOT_FOUND = () => {};

export function read(namespace, key) {
  const ns = readNamespace(namespace);
  if (ns !== NOT_FOUND && ns && ns.hasOwnProperty(key)) {
    return ns[key];
  }

  return NOT_FOUND;
}

/**
 * 将 key 对应的 value 写入 namespace 下
 * 比较暴力，如果无法写入会把所有 Design 相关的缓存清除
 * @param {string} namespace
 * @param {string} key
 * @param {any} value
 * @return {bool} true 表示成功，false 写入失败
 */
export function write(namespace, key, value) {
  let ns = readNamespace(namespace);
  const isRemove = value === undefined;

  // 不存在就创建一个新的
  if (ns === NOT_FOUND) {
    ns = {};
  }

  if (isRemove) {
    // 删除
    delete ns[key];
  } else {
    // 新增／更新
    ns[key] = value;
  }

  if (writeNamespace(namespace, ns)) {
    return true;
  }

  // 写入失败，尝试清空 namespace 下的所有值再重试
  ns = { [key]: value };
  return writeNamespace(namespace, ns);
}

export function remove(namespace, key) {
  return write(namespace, key, undefined);
}

function readNamespace(namespace) {
  const ns = localStorage.getItem(namespace);
  if (!ns) {
    return NOT_FOUND;
  }

  try {
    return JSON.parse(ns);
  } catch (ex) {
    return NOT_FOUND;
  }
}

function writeNamespace(namespace, value) {
  try {
    if (Object.keys(value).length === 0) {
      localStorage.removeItem(namespace);
    } else {
      const ns = JSON.stringify(value);
      localStorage.setItem(namespace, ns);
    }
  } catch (ex) {
    return false;
  }

  return true;
}
