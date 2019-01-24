import { isValidElementType } from 'react-is';

export function validElementType(props, propName, componentName) {
  if (!isValidElementType(props[propName])) {
    return new Error(
      `Invalid prop '${propName}' is supplied to '${componentName}'  . Validation failed.`
    );
  }
}
