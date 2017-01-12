import React from 'react';
import Item from './Item';

const Breadcrumb = function (props) {
  return (
    <div className={`${props.prefix}-breadcrumb ${props.className}`}>
      {props.children && React.Children.map(props.children, child => child)}
      {props.breads.length > 0 && props.breads.map((item, index) => {
        return <Item {...item} key={index} />;
      })}
    </div>
  );
};

Breadcrumb.Item = Item;

Breadcrumb.propTypes = {
  prefix: React.PropTypes.string,
  className: React.PropTypes.string,
  breads: React.PropTypes.array
};

Breadcrumb.defaultProps = {
  prefix: 'zent',
  className: '',
  breads: []
};

export default Breadcrumb;
