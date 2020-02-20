import * as React from 'react';
import { PureComponent } from 'react';
import classnames from 'classnames';

import Popover from '../../popover';
import Icon from '../../icon';
import { CascaderHandler, ICascaderItem, CascaderValue } from '../types';

const withPopover = Popover.withPopover;

export interface IMenuContentProps {
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
  getMenuItemIcon(item, isShowLoading, isActive) {
    if (item.children || item.isLeaf === false) {
      if (isShowLoading && isActive) {
        return <i className="zent-cascader__menu-item-loading zenticon" />;
      }

      return <Icon className="zent-cascader__menu-item-icon" type="right" />;
    }
    return null;
  }

  renderCascaderItems(items: ICascaderItem[], stage: number, popover) {
    const {
      value,
      clickHandler,
      isLoading,
      loadingStage,
      expandTrigger,
    } = this.props;

    const isShowLoading = isLoading && stage === loadingStage;

    const cascaderItems = items.map(item => {
      const isActive = item.id === value[stage - 1];
      const cascaderItemCls = classnames('zent-cascader__menu-item', {
        'zent-cascader__menu-item--active': isActive,
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
      <ul key={stage} className="zent-cascader__menu">
        {cascaderItems}
      </ul>
    );
  }

  renderPanels(popover) {
    const PanelEls = [];
    const { value, recursiveNextOptions } = this.props;
    let { options } = this.props;
    let tabIndex = 1;

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
    const { popover } = this.props;
    return (
      <div className="zent-cascader__popup-inner zent-cascader__popup-inner-menu">
        {this.renderPanels(popover)}
      </div>
    );
  }
}

export default withPopover(
  MenuContent as React.ComponentType<IMenuContentProps>
);
