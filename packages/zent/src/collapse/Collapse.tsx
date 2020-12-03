import { Children, cloneElement, Component } from 'react';
import cx from 'classnames';
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
}

export class Collapse extends Component<ICollapseProps> {
  static defaultProps = {
    bordered: true,
    panelTitleBackground: 'default',
    accordion: false,
  };

  static Panel = Panel;

  render() {
    const {
      className,
      bordered,
      panelTitleBackground,
      children,
      activeKey,
    } = this.props;

    return (
      <div
        className={cx('zent-collapse', className, {
          'zent-collapse--has-border': bordered,
          'zent-collpase--no-border': !bordered,
        })}
      >
        {Children.map(children, (c, idx) => {
          if (!isElement(c) || !kindOf(c.type, Panel)) {
            throw new Error(
              `Invalid children supplied to Collapse. Each child should be a Panel.`
            );
          }

          return cloneElement(c, {
            onChange: this.onChange,
            active: isPanelActive(activeKey, c.key),
            panelKey: c.key,
            panelTitleBackground,
            isLast: idx === Children.count(children) - 1,
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
      const keyIndex = activeKeyArray.indexOf(key);
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
  if (typeof activeKey === 'string') {
    return activeKey === key;
  }

  if (Array.isArray(activeKey)) {
    return activeKey.indexOf(key) !== -1;
  }

  return false;
}

export default Collapse;
