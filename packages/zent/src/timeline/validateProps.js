import PropTypes from 'prop-types';

export function validateProps(props, ...args) {
  if (props.timeline) {
    return PropTypes.array(props, ...args);
  } else if (props.children) {
    return PropTypes.node(props, ...args);
  }
  return new Error(`one of 'timeline' or 'children' must be set`);
}
