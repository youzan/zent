import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import Icon from 'icon';
import classnames from 'classnames';
import Popover from 'popover';

const withPopover = Popover.withPopover;

class MenuContent extends (PureComponent || Component) {
  static propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,
    popClassName: PropTypes.string,
    clickHandler: PropTypes.func,
    value: PropTypes.array,
    options: PropTypes.array,
    title: PropTypes.array,
    isLoading: PropTypes.bool
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

  renderCascaderItems(items, stage, popover) {
    let { prefix, value, clickHandler, isLoading, loadingStage } = this.props;

    const isShowLoading = isLoading && stage === loadingStage;

    let cascaderItems = items.map(item => {
      const isActive = item.id === value[stage - 1];
      let cascaderItemCls = classnames({
        [`${prefix}-cascader__menu-item`]: true,
        active: isActive
      });

      return (
        <li
          className={cascaderItemCls}
          title={item.title}
          onClick={() => clickHandler(item, stage, popover)}
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

  recursiveNextOptions(options, id) {
    if (options && options.length > 0) {
      let currOptions = find(options, { id });
      if (currOptions && currOptions.children) {
        return currOptions.children;
      }
    }
  }

  renderPanels(popover) {
    let PanelEls = [];
    let tabIndex = 1;
    let { options, value } = this.props;

    PanelEls.push(this.renderCascaderItems(options, tabIndex, popover));

    if (value && value.length > 0) {
      for (let i = 0; i < value.length; i++) {
        tabIndex++;
        options = this.recursiveNextOptions(options, value[i]);

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

export default withPopover(MenuContent);
