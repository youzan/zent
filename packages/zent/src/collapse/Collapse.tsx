import { Children, cloneElement, Component, PropsWithChildren } from 'react';
import cx from 'classnames';
import kindOf from '../utils/kindOf';
import Panel from './Panel';
import { isElement } from 'react-is';

export interface ICollapsePropsAccordion extends ICollapsePropsBase {
  accordion: true;
  activeKey?: string;
  onChange: (value: string | null) => void;
}

export interface ICollapsePropsMultiple extends ICollapsePropsBase {
  accordion?: false;
  activeKey?: string[];
  onChange: (value: string[]) => void;
}

interface ICollapsePropsBase {
  bordered?: boolean;
  panelTitleBackground?: string;
  className?: string;
  showContentBackground?: boolean;
}

// The I prefix is for backward compatibility
export type ICollapseProps = ICollapsePropsAccordion | ICollapsePropsMultiple;

export class Collapse extends Component<PropsWithChildren<ICollapseProps>> {
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
      showContentBackground,
      children,
      activeKey,
    } = this.props;

    return (
      <div
        className={cx('zent-collapse', className, {
          'zent-collapse--has-border': bordered,
          'zent-collapse--no-border': !bordered,
        })}
      >
        {Children.map(children, (c, idx) => {
          if (!isElement(c) || !kindOf(c.type, Panel)) {
            throw new Error(
              `Invalid children supplied to Collapse. Each child should be a Panel.`
            );
          }

          const key = c.key?.toString();
          return cloneElement(
            c as React.DetailedReactHTMLElement<any, HTMLElement>,
            {
              onChange: this.onChange,
              active: isPanelActive(activeKey, key),
              panelKey: key,
              panelTitleBackground,
              showContentBackground,
              isLast: idx === Children.count(children) - 1,
              bordered,
            }
          );
        })}
      </div>
    );
  }

  onChange = (key: string, active: boolean) => {
    if (this.props.accordion) {
      const { onChange, activeKey } = this.props;
      if (activeKey !== key && active) {
        onChange(key);
      } else if (activeKey === key && !active) {
        onChange(null);
      }
    } else {
      const { activeKey, onChange } = this.props as ICollapsePropsMultiple;
      const activeKeyArray = ([] as string[]).concat(activeKey ?? []);
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

function isPanelActive(
  activeKey: string | string[] | undefined,
  key: string | undefined
) {
  if (typeof activeKey === 'string') {
    return activeKey === key;
  }

  if (Array.isArray(activeKey)) {
    return key !== undefined && activeKey.indexOf(key) !== -1;
  }

  return false;
}

export default Collapse;
