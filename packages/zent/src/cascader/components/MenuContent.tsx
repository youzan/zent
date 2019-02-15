import * as React from 'react';
import { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import classnames from 'classnames';

import Popover from '../../popover';
import Icon from '../../icon';
import { CascaderHandler, ICascaderItem, CascaderValue } from '../types';

const withPopover = Popover.withPopover;

export interface IMenuContentProps {
  prefix?: string;
  className?: string;
  clickHandler: CascaderHandler;
  value: CascaderValue[];
  options: ICascaderItem[];
  isLoading?: boolean;
  recursiveNextOptions(
    options: ICascaderItem[],
    value: CascaderValue
  ): ICascaderItem[];
  expandTrigger?: 'click' | 'hover';
  loadingStage: number;
  popover: Popover;
}

class MenuContent extends PureComponent<IMenuContentProps> {
  static propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,
    clickHandler: PropTypes.func,
    value: PropTypes.array,
    options: PropTypes.array,
    isLoading: PropTypes.bool,
    recursiveNextOptions: PropTypes.func,
    expandTrigger: PropTypes.oneOf(['click', 'hover']),
  };

  getMenuItemIcon(item, isShowLoading, isActive) {
    const { prefix } = this.props;

    if (item.children || item.isLeaf === false) {
      if (isShowLoading && isActive) {
        return (
          <i className={`${prefix}-cascader__menu-item-loading zenticon`} />
        );
      }

      return (
        <Icon className={`${prefix}-cascader__menu-item-icon`} type="right" />
      );
    }
    return null;
  }

  renderCascaderItems(items: ICascaderItem[], stage: number, popover) {
    let {
      prefix,
      value,
      clickHandler,
      isLoading,
      loadingStage,
      expandTrigger,
    } = this.props;

    const isShowLoading = isLoading && stage === loadingStage;

    let cascaderItems = items.map(item => {
      const isActive = item.id === value[stage - 1];
      let cascaderItemCls = classnames({
        [`${prefix}-cascader__menu-item`]: true,
        active: isActive,
      });

      return (
        <li
          className={cascaderItemCls}
          title={item.title}
          onClick={() => clickHandler(item, stage, popover, 'click')}
          onMouseEnter={() =>
            expandTrigger === 'hover' &&
            clickHandler(item, stage, popover, 'hover')
          }
          key={item.id}
        >
          {item.title}
          {this.getMenuItemIcon(item, isShowLoading, isActive)}
          {}
        </li>
      );
    });

    return (
      <ul key={stage} className={`${prefix}-cascader__menu`}>
        {cascaderItems}
      </ul>
    );
  }

  renderPanels(popover) {
    let PanelEls = [];
    let tabIndex = 1;
    let { options, value, recursiveNextOptions } = this.props;

    PanelEls.push(this.renderCascaderItems(options, tabIndex, popover));

    if (value && value.length > 0) {
      for (let i = 0; i < value.length; i++) {
        tabIndex++;
        options = recursiveNextOptions(options, value[i]);

        if (options) {
          PanelEls.push(this.renderCascaderItems(options, tabIndex, popover));
        }
      }
    }

    return PanelEls;
  }

  render() {
    const { prefix, popover } = this.props;
    return (
      <div
        className={`${prefix}-cascader__popup-inner ${prefix}-cascader__popup-inner-menu`}
      >
        {this.renderPanels(popover)}
      </div>
    );
  }
}

export default withPopover(MenuContent as React.ComponentType<
  IMenuContentProps
>);
