import React from 'react';
import ReactDOM from 'react-dom';
import isBrowser from 'utils/isBrowser';
import NotifyContent from './NotifyContent';

const containerList = {};

let id = 0;

let durationDefault = 2000;

function createContainerId() {
  return ++id;
}

/**
 * 执行notify结束callback
 * @param  {Function} callback 关闭notify回调
 */
const closeNotifyCallback = callback => {
  if (typeof callback === 'function') {
    callback();
  }
};

/**
 * 关闭notify
 * @param  {[type]}   containerId notify容器Id
 * @param  {Function} callback    notify消失时回调
 */
const closeNotify = containerId => {
  const containerObj = containerList[containerId];

  if (!containerObj) {
    return;
  }

  const { container, callback, timeOutId } = containerObj;
  clearTimeout(timeOutId);
  ReactDOM.unmountComponentAtNode(container);
  delete containerList[containerId];
  closeNotifyCallback(callback);
};

/**
 * 关闭所有notify
 */
const closeAllNotify = () => {
  Object.keys(containerList).forEach(containerId => {
    closeNotify(containerId);
  });
};

/**
 * 显示notify
 * @param  {[type]}   container notify容器
 * @param  {[type]}   props     notify属性
 * @param  {Function} callback  notify消失时回调
 */
const showNotify = (container, props, callback) => {
  ReactDOM.render(React.createElement(NotifyContent, props), container);

  const containerId = createContainerId();
  const timeOutId = setTimeout(() => {
    closeNotify(containerId);
  }, props.duration || durationDefault);

  containerList[containerId] = { container, callback, timeOutId };
  return containerId;
};

/**
 * notify显示前初始化
 * @param  {[type]}   text     显示文案
 * @param  {[type]}   duration 显示时长
 * @param  {[type]}   status   notify状态
 * @param  {Function} callback notify消失时回调
 */
const readyToShow = (text, duration, status, callback) => {
  if (!isBrowser) return;

  let container = document.createElement('div');
  const props = {
    visible: true,
    text,
    duration,
    status
  };
  return showNotify(container, props, callback);
};

export function success(text, duration, callback) {
  return readyToShow(text, duration, 'success', callback);
}

export function error(text, duration, callback) {
  return readyToShow(text, duration, 'error', callback);
}

export function clear(containerId) {
  if (containerId) {
    closeNotify(containerId);
  } else {
    closeAllNotify();
  }
}

export function config(options) {
  if (options.duration) {
    durationDefault = options.duration;
  }
}
