/**
 * getDocumentClientSize
 *
 * @author hyczzhu
 */

let documentClientHeight = null;
let documentClientWidth = null;
if (process.env.BROWSER) {
  documentClientHeight = document.documentElement.clientHeight;
  documentClientWidth = document.documentElement.clientWidth;

  window.addEventListener('resize', () => {
    documentClientHeight = document.documentElement.clientHeight;
    documentClientWidth = document.documentElement.clientWidth;
  });
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
