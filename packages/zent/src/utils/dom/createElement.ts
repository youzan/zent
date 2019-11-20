/**
 * Creates an instance of the element for the specified tag.
 * @param tagName The name of an element.
 */
function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  options?: ElementCreationOptions
): HTMLElementTagNameMap[K];
/** @deprecated */
function createElement<K extends keyof HTMLElementDeprecatedTagNameMap>(
  tagName: K,
  options?: ElementCreationOptions
): HTMLElementDeprecatedTagNameMap[K];
function createElement(
  tagName: string,
  options?: ElementCreationOptions
): HTMLElement;

function createElement(tagName, options?) {
  // tslint:disable-next-line
  const node = document.createElement(tagName, options);
  node.setAttribute('data-zv', __ZENT_VERSION__);
  return node;
}

export default createElement;
