import React from 'react';
import ReactDOM from 'react-dom';
import NotifyContent from './NotifyContent';

const containerList = {};

let id = 0;

function createContainerId() {
  return ++id;
}

const closeNotify = (containerId) => {
  let container = containerList[containerId];
  if (!container) {
    return;
  }
  ReactDOM.unmountComponentAtNode(container);
  delete containerList[containerId];
};

const showNotify = (container, props) => {
  ReactDOM.render(
    React.createElement(NotifyContent, props),
    container
  );

  const containerId = createContainerId();
  containerList[containerId] = container;

  setTimeout(() => {
    closeNotify(containerId);
  }, props.duration || 3000);
};

const closeAllNotify = () => {
  Object.keys(containerList).forEach((containerId) => {
    closeNotify(containerId);
  });
};

const readyToShow = (text, duration, status) => {
  let container = document.createElement('div');
  const props = {
    visible: true,
    text,
    duration,
    status
  };
  showNotify(container, props);
};

export function success(text, duration) {
  readyToShow(text, duration, 'success');
}

export function error(text, duration) {
  readyToShow(text, duration, 'error');
}

export function clear(containerId) {
  if (containerId) {
    closeNotify(containerId);
  } else {
    closeAllNotify();
  }
}
