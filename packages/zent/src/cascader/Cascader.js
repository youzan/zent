import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import forEach from 'lodash/forEach';
import find from 'lodash/find';
import noop from 'lodash/noop';
import Popover from 'popover';
import Tabs from 'tabs';
import Icon from 'icon';

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

class Cascader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      onChangeValue: [],
      activeId: 1,
      open: false
    };
  }

  componentWillMount() {
    this.resetCascaderValue(this.state.value, false);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty('value')) {
      let nextValue = nextProps.value || [];
      this.setState({ value: nextValue });
      this.resetCascaderValue(nextValue, false);
    }
  }

  resetCascaderValue(value, isTriggerChange = true) {
    let onChangeValue = [];
    let activeId = 1;
    let { options, onChange } = this.props;

    if (options && options.length > 0 && value && value.length > 0) {
      activeId = 0;
      forEach(value, id => {
        let nextOption = find(options, { id });
        activeId++;
        options = nextOption.children;
        onChangeValue.push({
          id: nextOption.id,
          name: nextOption.name
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

  onShow() {
    this.setState({
      open: true
    });
  }

  onClose() {
    this.setState({
      open: false
    });
  }

  onTabChange = id => {
    this.setState({
      activeId: id
    });
  };

  renderCascaderItems(items, stage, popover) {
    let { prefix } = this.props;

    let { value } = this.state;

    let cascaderItems = items.map(item => {
      let cascaderItemCls = classnames({
        [`${prefix}-cascader-list__item-link`]: true,
        active: item.id === value[stage - 1]
      });

      return (
        <span className={`${prefix}-cascader-list__item`} key={item.id}>
          <span
            className={cascaderItemCls}
            onClick={() => this.clickHandler(item, stage, popover)}
          >
            {item.name}
          </span>
        </span>
      );
    });

    return (
      <div className={`${prefix}-cascader-list`}>
        {cascaderItems}
      </div>
    );
  }

  clickHandler = (item, stage, popover) => {
    let { value } = this.state;
    let { changeOnSelect } = this.props;

    value = value.slice(0, stage - 1);
    value.push(item.id);

    let obj = {
      value
    };
    let hasClose = false;

    if (item.children) {
      obj.activeId = ++stage;
    } else {
      hasClose = true;
      popover.close();
      this.resetCascaderValue(value);
    }

    if (changeOnSelect && !hasClose) {
      this.resetCascaderValue(value, true);
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
    let { options, title } = this.props;

    let { value } = this.state;
    let tabTitle = '标题';

    title = title || [];
    if (title.length > 0) {
      tabTitle = title[0];
    }

    PanelEls.push(
      <TabPanel tab={tabTitle} id={tabIndex} key={tabIndex}>
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
            <TabPanel tab={tabTitle} id={tabIndex} key={tabIndex}>
              {this.renderCascaderItems(options, tabIndex, popover)}
            </TabPanel>
          );
        }
      }
    }

    return PanelEls;
  }

  render() {
    let self = this;

    let { prefix, className, popClassName, placeholder } = this.props;

    let { onChangeValue, open, activeId } = this.state;

    let cascaderCls = classnames({
      [`${prefix}-cascader-select`]: true,
      open
    });

    const CascaderPopoverContent = withPopover(({ popover }) => {
      return (
        <div className={`${prefix}-cascader-select__popup`}>
          <Tabs
            activeId={activeId}
            onTabChange={self.onTabChange}
            className={`${prefix}-cascader-tabs`}
          >
            {self.renderPanels(popover)}
          </Tabs>
        </div>
      );
    });

    let cascaderWrapCls = classnames({
      [`${prefix}-cascader-select-wrap`]: true,
      [className]: true
    });

    let cascaderValue = placeholder;
    if (onChangeValue && onChangeValue.length > 0) {
      cascaderValue = onChangeValue.map(valueItem => {
        return valueItem.name;
      });
      cascaderValue = cascaderValue.join(' / ');
    }

    return (
      <div className={cascaderWrapCls}>
        <Popover
          className={popClassName}
          position={Popover.Position.BottomLeft}
          onShow={this.onShow.bind(this)}
          onClose={this.onClose.bind(this)}
        >
          <PopoverClickTrigger>
            <div className={cascaderCls}>
              <div className={`${prefix}-cascader-select__text`}>
                {cascaderValue}
                <Icon type="caret-down" />
              </div>
            </div>
          </PopoverClickTrigger>
          <PopoverContent>
            <CascaderPopoverContent />
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
  value: PropTypes.array,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  changeOnSelect: PropTypes.bool,
  title: PropTypes.array
};

Cascader.defaultProps = {
  prefix: 'zent',
  className: '',
  popClassName: 'zent-cascader-popup',
  onChange: noop,
  value: [],
  options: [],
  placeholder: '请选择',
  changeOnSelect: false,
  title: ['省份', '城市', '县区']
};

export default Cascader;
