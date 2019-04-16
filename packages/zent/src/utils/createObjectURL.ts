export default function createObjectURL<T extends {}>(object: T) {
  return window.URL
    ? window.URL.createObjectURL(object)
    : (window as any).webkitURL.createObjectURL(object);
}
