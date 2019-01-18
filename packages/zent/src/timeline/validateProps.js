import PropTypes from 'prop-types';

export function validateProps(props, ...args) {
  if (props.timeline) {
    return PropTypes.array(props, ...args);
  }

  if (props.children) {
    return PropTypes.node(props, ...args);
  }

  return new Error(`one of 'timeline' or 'children' must be set`);
}
