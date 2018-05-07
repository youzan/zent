/**
 * selectionchange event is really wired on Firefox(testing on v59), we use click instead.
 */

import findIndex from 'lodash/findIndex';
import isEmpty from 'lodash/isEmpty';
import isFirefox from 'utils/isFirefox';

let gEventRegistered = false;
let subscriberList = [];

export function install(config) {
  if (!gEventRegistered) {
    if (isFirefox) {
      document.addEventListener('click', onDocumentSelectionChange, true);
    } else {
      document.addEventListener('selectionchange', onDocumentSelectionChange);
    }
  }

  const idx = findIndex(subscriberList, config);
  if (idx === -1) {
    subscriberList.push(config);
  }
}

export function uninstall(config) {
  const idx = findIndex(subscriberList, config);
  subscriberList.splice(idx, 1);

  if (isEmpty(subscriberList)) {
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
  const matchedSubscriberIndex = findIndex(subscriberList, {
    node: activeElement,
  });
  if (matchedSubscriberIndex !== -1) {
    subscriberList[matchedSubscriberIndex].callback(evt);
  }
}
