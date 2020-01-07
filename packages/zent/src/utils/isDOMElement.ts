import { isElement } from 'react-is';

/**
 * When an element's type is a string, it represents a DOM node with that tag name
 * https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html#dom-elements
 *
 * @param component
 * @returns Whether the component is a DOM Element
 */
export default function isDOMElement(
  component: any
): component is React.ReactElement {
  return isElement(component) && typeof component.type === 'string';
}
