/**
 * selectionchange event is really wired on Firefox(testing on v59), we use click instead.
 */

import isFirefox from '../utils/isFirefox';

const gEventRegistered = false;
const subscriberList = [];

export function install(config) {
  if (!gEventRegistered) {
    if (isFirefox) {
      document.addEventListener('click', onDocumentSelectionChange, true);
    } else {
      document.addEventListener('selectionchange', onDocumentSelectionChange);
    }
  }

  const idx = findSubscriberIndex(config);
  if (idx === -1) {
    subscriberList.push(config);
  }
}

export function uninstall(config) {
  const idx = findSubscriberIndex(config);
  if (idx === -1) {
    return;
  }

  subscriberList.splice(idx, 1);

  if (subscriberList.length === 0) {
    if (isFirefox) {
      document.removeEventListener('click', onDocumentSelectionChange, true);
    } else {
      document.removeEventListener(
        'selectionchange',
        onDocumentSelectionChange
      );
    }
  }
}

function onDocumentSelectionChange(evt) {
  const { activeElement } = document;
  const matchedSubscriberIndex = findSubscriberIndex({
    node: activeElement,
  } as any);
  if (matchedSubscriberIndex !== -1) {
    subscriberList[matchedSubscriberIndex].callback(evt);
  }
}

function findSubscriberIndex(config) {
  const keys = Object.keys(config);
  return subscriberList.findIndex(item =>
    keys.every(k => item[k] === config[k])
  );
}
