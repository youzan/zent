/**
 * getDocumentClientSize
 *
 * @author hyczzhu
 */

let documentClientHeight: number | null = null;
let documentClientWidth: number | null = null;
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
