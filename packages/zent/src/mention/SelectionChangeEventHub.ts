/**
 * selectionchange event is really wired on Firefox(testing on v59), we use click instead.
 */

import isFirefox from '../utils/isFirefox';
import { addEventListener } from '../utils/component/event-handler';

const gEventRegistered = false;
const subscriberList = [];
let cancelEvent = null as () => void;

export function install(config) {
  if (!gEventRegistered) {
    if (isFirefox) {
      cancelEvent = addEventListener(
        document,
        'click',
        onDocumentSelectionChange,
        {
          capture: true,
          passive: true,
        }
      );
    } else {
      cancelEvent = addEventListener(
        document,
        'selectionchange',
        onDocumentSelectionChange,
        { passive: true }
      );
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
    cancelEvent();
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
