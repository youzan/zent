import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import kindOf from 'utils/kindOf';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import includes from 'lodash/includes';
import indexOf from 'lodash/indexOf';

import Panel from './Panel';

export default class Collapse extends PureComponent {
  static propTypes = {
    activeKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    onChange: PropTypes.func.isRequired,
    accordion: PropTypes.bool,
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
    prefix: PropTypes.string,
  };

  static defaultProps = {
    bordered: true,
    accordion: false,
    prefix: 'zent',
  };

  render() {
    const { className, prefix, bordered, children, activeKey } = this.props;

    return (
      <div
        className={cx(`${prefix}-collapse`, className, {
          [`${prefix}-collapse--has-border`]: bordered,
          [`${prefix}-collpase--no-border`]: !bordered,
        })}
      >
        {React.Children.map(children, (c, idx) =>
          React.cloneElement(c, {
            onChange: this.onChange,
            active: isPanelActive(activeKey, c.key),
            panelKey: c.key,
            isLast: idx === React.Children.count(children) - 1,
            bordered,
          })
        )}
      </div>
    );
  }

  onChange = (key, active) => {
    const { activeKey, accordion, onChange } = this.props;

    if (accordion) {
      if (activeKey !== key && active) {
        onChange(key);
      } else if (activeKey === key && !active) {
        onChange(null);
      }
    } else {
      const activeKeyArray = [].concat(activeKey);
      const keyIndex = indexOf(activeKeyArray, key);
      if (active) {
        keyIndex === -1 && activeKeyArray.push(key);
      } else {
        keyIndex !== -1 && activeKeyArray.splice(keyIndex, 1);
      }

      onChange(activeKeyArray);
    }
  };
}

function isPanelActive(activeKey, key) {
  if (isString(activeKey)) {
    return activeKey === key;
  } else if (isArray(activeKey)) {
    return includes(activeKey, key);
  }

  return false;
}
