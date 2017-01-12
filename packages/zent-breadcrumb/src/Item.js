import React, { PropTypes } from 'react';

const Item = function (props) {
  const { href, name, ...others } = props;
  if (props.children) {
    return props.children;
  }
  return href ? <a {...others} href={href}>{name}</a> : <span {...others}>{name}</span>;
};

Item.propTypes = {
  href: PropTypes.string
};

export default Item;
