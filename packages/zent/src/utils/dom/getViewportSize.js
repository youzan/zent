/**
 * 获取viewport的宽高
 */
export default function getViewportSize() {
  // http://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript
  const doc = document.documentElement;
  return {
    width: Math.max(doc.clientWidth, window.innerWidth || 0),
    height: Math.max(doc.clientHeight, window.innerHeight || 0),
  };
}
