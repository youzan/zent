import { ReactNode } from 'react';
import * as ReactDOM from 'react-dom';
import isBrowser from '../utils/isBrowser';
import createElement from '../utils/dom/createElement';
import NotifyContent from './NotifyContent';

let index = 0;
let durationDefault = 3500;
let containerSelectorDefault = 'body';
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
 * 添加className，需要检查是否存在
 * @param  {HTMLElement} node      dom节点
 * @param  {String} className class名称
 */
const addClassName = (node: HTMLElement, className: string) => {
  if (node.classList && !node.classList.contains(className)) {
    node.classList.add(className);
  }
};

/**
 * 创建承载notify portal的容器，containerSelector可以自定义notify的挂载位置
 */
const createNotifyContainerNode = (
  containerSelector,
  className
): HTMLElement => {
  const rootContainerSelector = containerSelector || containerSelectorDefault;

  let notifyContainerNode = document.querySelector<HTMLElement>(
    `${rootContainerSelector} > .${notifyContainerClass}`
  );

  const rootContainer =
    document.querySelector<HTMLElement>(rootContainerSelector) || document.body;

  if (!notifyContainerNode) {
    const div = createElement('div');
    div.className = notifyContainerClass;
    notifyContainerNode = rootContainer.appendChild(div);
  }

  if (className) {
    addClassName(notifyContainerNode, className);
  }

  if (rootContainerSelector !== 'body') {
    addClassName(notifyContainerNode, 'zent-notify-container-custom');
  }

  return notifyContainerNode;
};

/**
 * notify显示
 * @param  {[type]}   text     显示文案
 * @param  {[type]}   duration 显示时长
 * @param  {[type]}   status   notify状态
 * @param  {Function} callback notify消失时回调
 * @param  {[String]} containerSelector  自定义父容器挂载节点
 * @param  {[String]} className  自定义样式类
 */
const show = (
  text: ReactNode,
  duration?: number,
  status?: string,
  callback?: () => void,
  containerSelector?: string,
  className?: string
) => {
  if (!isBrowser) return null;

  const container = createElement('div');
  const notifyContainerNode = createNotifyContainerNode(
    containerSelector,
    className
  );
  const props: any = {
    text,
    status,
    duration,
    isIn: true,
    selector: notifyContainerNode,
  };

  ReactDOM.render(<NotifyContent {...props} />, container);
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

export function success(
  text: ReactNode,
  duration?: number,
  callback?: () => void,
  containerSelector?: string,
  className?: string
) {
  return show(
    text,
    duration,
    'success',
    callback,
    containerSelector,
    className
  );
}

export function warn(
  text: ReactNode,
  duration?: number,
  callback?: () => void,
  containerSelector?: string,
  className?: string
) {
  return show(text, duration, 'warn', callback, containerSelector, className);
}

export function error(
  text: ReactNode,
  duration?: number,
  callback?: () => void,
  containerSelector?: string,
  className?: string
) {
  return show(text, duration, 'error', callback, containerSelector, className);
}

export function info(
  text: ReactNode,
  duration?: number,
  callback?: () => void,
  containerSelector?: string,
  className?: string
) {
  return show(text, duration, 'info', callback, containerSelector, className);
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
  if (options.containerSelector) {
    containerSelectorDefault = options.containerSelector;
  }
}
