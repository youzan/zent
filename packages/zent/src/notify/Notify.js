import React from 'react';
import ReactDOM from 'react-dom';
import isBrowser from 'utils/isBrowser';
import NotifyContent from './NotifyContent';

let index = 0;
let durationDefault = 2000;
const containerList = {};
const notifyContainerClass = 'zent-notify-container';

const createContainerId = () => {
  return ++index;
};

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
 * 创建承载notify portal的容器
 */
const createNotifyContainerNode = () => {
  let notifyContainerNode = document.querySelector('.zent-notify-container');

  if (!notifyContainerNode) {
    const bodyNode = document.body;
    const div = document.createElement('div');
    div.className = notifyContainerClass;
    notifyContainerNode = bodyNode.appendChild(div);
  }

  return notifyContainerNode;
};

/**
 * notify显示
 * @param  {[type]}   text     显示文案
 * @param  {[type]}   duration 显示时长
 * @param  {[type]}   status   notify状态
 * @param  {Function} callback notify消失时回调
 */
const show = (text, duration, status, callback) => {
  if (!isBrowser) return;

  let container = document.createElement('div');
  const notifyContainerNode = createNotifyContainerNode();
  const props = {
    text,
    duration,
    status,
    isIn: true,
    selector: notifyContainerNode
  };

  ReactDOM.render(React.createElement(NotifyContent, props), container);
  const containerId = createContainerId();

  const timeOutId = setTimeout(() => {
    ReactDOM.render(
      <NotifyContent
        isIn={false}
        text={text}
        selector={notifyContainerNode}
        status={status}
        close={() => closeNotify(containerId)}
      />,
      container
    );
  }, props.duration || durationDefault);

  containerList[containerId] = { container, callback, timeOutId };
  return containerId;
};

export function success(text, duration, callback) {
  return show(text, duration, 'success', callback);
}

export function error(text, duration, callback) {
  return show(text, duration, 'error', callback);
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
