import { addEventListener } from '../component/event-handler';
import isBrowser from '../isBrowser';

/**
 * getDocumentClientSize
 *
 * @author hyczzhu
 */

let documentClientHeight: number | null = null;
let documentClientWidth: number | null = null;
if (isBrowser) {
  documentClientHeight = document.documentElement.clientHeight;
  documentClientWidth = document.documentElement.clientWidth;

  addEventListener(
    window,
    'resize',
    () => {
      documentClientHeight = document.documentElement.clientHeight;
      documentClientWidth = document.documentElement.clientWidth;
    },
    { passive: true }
  );
}
export function getDocumentClientHeight() {
  return documentClientHeight;
}
export function getDocumentClientWidth() {
  return documentClientWidth;
}

export default function getDocumentClientSize() {
  return {
    width: documentClientWidth,
    height: documentClientHeight,
  };
}
