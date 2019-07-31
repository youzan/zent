import * as React from 'react';
import { Component } from 'react';
import cx from 'classnames';
import isString from 'lodash-es/isString';
import includes from 'lodash-es/includes';
import indexOf from 'lodash-es/indexOf';
import kindOf from '../utils/kindOf';
import Panel from './Panel';
import { isElement } from 'react-is';

interface ICollapseProps {
  activeKey?: string | string[];
  onChange: (value: string | string[]) => any;
  accordion?: boolean;
  bordered?: boolean;
  panelTitleBackground?: string;
  className?: string;
  prefix?: string;
}

export class Collapse extends Component<ICollapseProps> {
  static defaultProps = {
    bordered: true,
    panelTitleBackground: 'default',
    accordion: false,
    prefix: 'zent',
  };

  static Panel = Panel;

  render() {
    const {
      className,
      prefix,
      bordered,
      panelTitleBackground,
      children,
      activeKey,
    } = this.props;

    return (
      <div
        className={cx(`${prefix}-collapse`, className, {
          [`${prefix}-collapse--has-border`]: bordered,
          [`${prefix}-collpase--no-border`]: !bordered,
        })}
      >
        {React.Children.map(children, (c, idx) => {
          if (!isElement(c) || !kindOf(c.type, Panel)) {
            throw new Error(
              `Invalid children supplied to Collapse. Each child should be a Panel.`
            );
          }

          return React.cloneElement(c, {
            onChange: this.onChange,
            active: isPanelActive(activeKey, c.key),
            panelKey: c.key,
            panelTitleBackground,
            isLast: idx === React.Children.count(children) - 1,
            bordered,
          });
        })}
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
  }

  if (Array.isArray(activeKey)) {
    return includes(activeKey, key);
  }

  return false;
}

export default Collapse;
