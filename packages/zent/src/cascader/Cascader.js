import React, { Component, PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Popover from 'popover';
import Tabs from 'tabs';
import Icon from 'icon';
import forEach from 'lodash/forEach';
import find from 'lodash/find';
import noop from 'lodash/noop';

const PopoverContent = Popover.Content;
const withPopover = Popover.withPopover;
const TabPanel = Tabs.TabPanel;

class PopoverClickTrigger extends Popover.Trigger.Click {
  getTriggerProps(child) {
    return {
      onClick: evt => {
        if (this.props.contentVisible) {
          this.props.close();
        } else {
          this.props.open();
        }
        this.triggerEvent(child, 'onClick', evt);
      }
    };
  }
}

class Cascader extends (PureComponent || Component) {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      options: props.options,
      onChangeValue: [],
      activeId: 1,
      open: false
    };
  }

  componentWillMount() {
    this.resetCascaderValue(null, null, false);
  }

  componentWillReceiveProps(nextProps) {
    let { loadMore } = this.props;

    if (nextProps.hasOwnProperty('value')) {
      let nextValue = nextProps.value || [];
      if (!loadMore) {
        this.setState({
          value: nextValue
        });
      }
      this.resetCascaderValue(nextValue, nextProps.options, false);
    }
    if (this.props.options !== nextProps.options) {
      this.setState({
        options: nextProps.options
      });
    }
  }

  resetCascaderValue(value, options, isTriggerChange = true) {
    let onChangeValue = [];
    let activeId = 1;
    let { onChange } = this.props;
    let state = this.state;
    value = value || state.value;
    options = options || state.options;

    if (options && options.length > 0 && value && value.length > 0) {
      activeId = 0;
      forEach(value, id => {
        let nextOption = find(options, { id });
        activeId++;
        options = nextOption.children;
        onChangeValue.push({
          id: nextOption.id,
          title: nextOption.title
        });
      });
    }

    if (isTriggerChange) {
      onChange(onChangeValue);
    }

    this.setState({
      onChangeValue,
      activeId
    });
  }

  onShow = () => {
    this.setState({
      open: true
    });
  };

  onClose = () => {
    this.setState({
      open: false
    });
  };

  onTabChange = id => {
    this.setState({
      activeId: id
    });
  };

  clickHandler = (item, stage, popover) => {
    let { loadMore } = this.props;
    let { options } = this.state;
    if (
      !item.isLeaf &&
      loadMore &&
      (!item.children || item.children.length === 0)
    ) {
      this.setState({
        isLoading: true,
        loadingStage: stage
      });
      loadMore(item, stage).then(children => {
        item.children = children;
        this.expandHandler(item, stage, popover);
        this.setState({
          options,
          isLoading: false
        });
      });
    } else {
      this.expandHandler(item, stage, popover);
    }
  };

  expandHandler = (item, stage, popover) => {
    let { value } = this.state;
    let { changeOnSelect } = this.props;
    let hasClose = false;

    value = value.slice(0, stage - 1);
    value.push(item.id);

    let obj = {
      value
    };

    if (item.children) {
      obj.activeId = ++stage;
    } else {
      hasClose = true;
      popover.close();
    }

    if (hasClose || changeOnSelect) {
      this.resetCascaderValue(value);
    }

    this.setState(obj);
  };

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
    let { title } = this.props;

    let { options, value } = this.state;
    let tabTitle = '标题';

    title = title || [];
    if (title.length > 0) {
      tabTitle = title[0];
    }

    PanelEls.push(
      <TabPanel
        tab={this.renderTabTitle(tabTitle, tabIndex)}
        id={tabIndex}
        key={tabIndex}
      >
        {this.renderCascaderItems(options, tabIndex, popover)}
      </TabPanel>
    );

    if (value && value.length > 0) {
      for (let i = 0; i < value.length; i++) {
        tabIndex++;
        options = this.recursiveNextOptions(options, value[i]);
        if (title.length >= tabIndex) {
          tabTitle = title[tabIndex - 1];
        } else {
          tabTitle = '标题';
        }
        if (options) {
          PanelEls.push(
            <TabPanel
              tab={this.renderTabTitle(tabTitle, tabIndex)}
              id={tabIndex}
              key={tabIndex}
            >
              {this.renderCascaderItems(options, tabIndex, popover)}
            </TabPanel>
          );
        }
      }
    }

    return PanelEls;
  }

  renderCascaderItems(items, stage, popover) {
    let { prefix } = this.props;
    let { value } = this.state;

    let cascaderItems = items.map(item => {
      let cascaderItemCls = classnames({
        [`${prefix}-cascader__list-link`]: true,
        active: item.id === value[stage - 1]
      });

      return (
        <div className={`${prefix}-cascader__list-item`} key={item.id}>
          <span
            className={cascaderItemCls}
            title={item.title}
            onClick={() => this.clickHandler(item, stage, popover)}
          >
            {item.title}
          </span>
        </div>
      );
    });

    return (
      <div className={`${prefix}-cascader__list`}>
        {cascaderItems}
      </div>
    );
  }

  renderTabTitle(title, stage) {
    let { prefix } = this.props;
    let { isLoading, loadingStage } = this.state;

    if (isLoading && stage === loadingStage) {
      return (
        <div className={`${prefix}-cascader__loading`}>
          <div className={`${prefix}-cascader__loading-label`}>
            {title}
          </div>
          <div className={`${prefix}-cascader__loading-icon`} />
        </div>
      );
    }

    return title;
  }

  render() {
    let { prefix, className, popClassName, placeholder } = this.props;
    let { onChangeValue, open, activeId } = this.state;

    const CascaderPopoverContent = withPopover(({ popover }) => {
      return (
        <div className={`${prefix}-cascader__popup-inner`}>
          <Tabs
            activeId={activeId}
            onTabChange={this.onTabChange}
            className={`${prefix}-cascader__tabs`}
          >
            {this.renderPanels(popover)}
          </Tabs>
        </div>
      );
    });

    let cascaderValue = placeholder;
    let hasValue = false;
    if (onChangeValue && onChangeValue.length > 0) {
      hasValue = true;
      cascaderValue = onChangeValue.map(valueItem => {
        return valueItem.title;
      });
      cascaderValue = cascaderValue.join(' / ');
    }

    let cascaderCls = classnames({
      [`${prefix}-cascader`]: true,
      [className]: true,
      open
    });

    let selectTextCls = classnames({
      [`${prefix}-cascader__select-text`]: true,
      'is-placeholder': !hasValue
    });

    return (
      <div className={cascaderCls}>
        <Popover
          className={popClassName}
          position={Popover.Position.BottomLeft}
          onShow={this.onShow}
          onClose={this.onClose}
        >
          <PopoverClickTrigger>
            <div className={`${prefix}-cascader__select`}>
              <div className={selectTextCls}>
                <span>
                  {cascaderValue}
                </span>
                <Icon type="caret-down" />
              </div>
            </div>
          </PopoverClickTrigger>
          <PopoverContent>
            <CascaderPopoverContent ref={ref => (this.cascader = ref)} />
          </PopoverContent>
        </Popover>
      </div>
    );
  }
}

Cascader.propTypes = {
  prefix: PropTypes.string,
  className: PropTypes.string,
  popClassName: PropTypes.string,
  onChange: PropTypes.func,
  loadMore: PropTypes.func,
  value: PropTypes.array,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  changeOnSelect: PropTypes.bool,
  title: PropTypes.array
};

Cascader.defaultProps = {
  prefix: 'zent',
  className: '',
  popClassName: 'zent-cascader__popup',
  onChange: noop,
  value: [],
  options: [],
  placeholder: '请选择',
  changeOnSelect: false,
  title: ['省份', '城市', '县区']
};

export default Cascader;
