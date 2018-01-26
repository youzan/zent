import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import kindOf from 'utils/kindOf';

import Panel from './Panel';

export default class Collapse extends (PureComponent || Component) {
  static propTypes = {
    activeKey: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    bordered: PropTypes.bool,
    children(props, propName, componentName) {
      const propValue = props[propName];

      React.Children.forEach(propValue, c => {
        if (!kindOf(c.type, Panel)) {
          throw new Error(
            `Invalid prop ${propName} supplied to ${componentName}. Each child should be a Panel.`
          );
        }
      });
    },
    className: PropTypes.string,
    prefix: PropTypes.string
  };

  static defaultProps = {
    bordered: true,
    prefix: 'zent'
  };

  render() {
    const { className, prefix, bordered, children, activeKey } = this.props;

    return (
      <div
        className={cx(`${prefix}-collapse`, className, {
          [`${prefix}-collapse--has-border`]: bordered,
          [`${prefix}-collpase--no-border`]: !bordered
        })}
      >
        {React.Children.map(children, c =>
          React.cloneElement(c, {
            onChange: this.onChange,
            active: activeKey === c.key
          })
        )}
      </div>
    );
  }

  onChange = (key, active) => {
    console.log(key, active);
  };
}
