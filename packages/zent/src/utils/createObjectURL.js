export default function createObjectURL(object) {
  return window.URL
    ? window.URL.createObjectURL(object)
    : window.webkitURL.createObjectURL(object);
}
