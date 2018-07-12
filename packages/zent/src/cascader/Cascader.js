import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Popover from 'popover';
import Icon from 'icon';
import find from 'lodash/find';
import noop from 'lodash/noop';
import isArray from 'lodash/isArray';
import { I18nReceiver as Receiver } from 'i18n';
import { Cascader as I18nDefault } from 'i18n/default';

import TabsPopoverContent from './components/TabsContent';
import MenuPopoverContent from './components/MenuContent';

const PopoverContent = Popover.Content;

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
      },
    };
  }
}

class Cascader extends PureComponent {
  static propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,
    popClassName: PropTypes.string,
    onChange: PropTypes.func,
    loadMore: PropTypes.func,
    value: PropTypes.array,
    displayText: PropTypes.func,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    changeOnSelect: PropTypes.bool,
    title: PropTypes.array,
    type: PropTypes.oneOf(['tabs', 'menu']),
  };

  static defaultProps = {
    prefix: 'zent',
    className: '',
    popClassName: 'zent-cascader__popup',
    onChange: noop,
    value: [],
    options: [],
    placeholder: '',
    changeOnSelect: false,
    title: [],
    type: 'tabs',
  };

  constructor(props) {
    super(props);

    this.state = {
      value: isArray(props.value) ? props.value : [],
      options: isArray(props.options) ? props.options : [],
      activeValue: [],
      activeId: 1,
      open: false,
    };
  }

  componentWillMount() {
    this.resetCascaderValue(null, null, false);
  }

  componentWillReceiveProps(nextProps) {
    let { loadMore } = this.props;

    if (nextProps.hasOwnProperty('value')) {
      let nextValue = isArray(nextProps.value) ? nextProps.value : [];
      if (!loadMore) {
        this.setState({
          value: nextValue,
        });
      }
      this.resetCascaderValue(nextValue, nextProps.options, false);
    }
    if (this.props.options !== nextProps.options) {
      this.setState({
        options: isArray(nextProps.options) ? nextProps.options : [],
      });
    }
  }

  recursiveNextOptions(options, id) {
    if (options && options.length > 0) {
      let currOptions = find(options, { id });
      if (currOptions && currOptions.children) {
        return currOptions.children;
      }
    }
  }

  resetCascaderValue(value, options, isTriggerChange = true) {
    let activeValue = [];
    let activeId = 1;
    let { onChange } = this.props;
    let state = this.state;
    value = value || state.value;
    options = options || state.options;

    if (options && options.length > 0 && value && value.length > 0) {
      activeId = 0;
      for (let i = 0; i < value.length; i++) {
        let id = value[i];
        let nextOption = find(options, { id });
        activeId++;
        if (!nextOption) break;

        options = nextOption.children;
        activeValue.push({
          id: nextOption.id,
          title: nextOption.title,
        });
      }
    }

    if (isTriggerChange) {
      onChange(activeValue);
    }

    this.setState({
      activeValue,
      activeId,
    });
  }

  onShow = () => {
    this.setState({
      open: true,
    });
  };

  onClose = () => {
    const { value } = this.props;
    this.setState({
      open: false,
      value: isArray(value) ? value : [],
      activeId: 1,
    });
  };

  onTabChange = id => {
    this.setState({
      activeId: id,
    });
  };

  clickHandler = (item, stage, popover) => {
    let { loadMore } = this.props;
    let { options } = this.state;
    let needLoading =
      !item.isLeaf &&
      loadMore &&
      (!item.children || item.children.length === 0);

    this.expandHandler(item, stage, popover, needLoading);

    if (needLoading) {
      this.setState({
        isLoading: true,
        loadingStage: stage,
      });
      loadMore(item, stage).then(children => {
        item.children = children;
        this.expandHandler(item, stage, popover, false);
        this.setState({
          options,
          isLoading: false,
        });
      });
    }
  };

  expandHandler = (item, stage, popover, willLoading) => {
    let { value } = this.state;
    let { changeOnSelect } = this.props;
    let hasClose = false;

    value = value.slice(0, stage - 1);
    value.push(item.id);

    let obj = {
      value,
    };

    if (item.children || item.isLeaf === false) {
      if (!willLoading) {
        obj.activeId = ++stage;
      }
    } else {
      hasClose = true;
      popover.close();
    }

    if (hasClose || changeOnSelect) {
      this.resetCascaderValue(value);
    }

    this.setState(obj);
  };

  getPopoverContent(i18n) {
    const { type, prefix, title, options } = this.props;
    let { activeId, value, isLoading, loadingStage } = this.state;
    let PopoverContentType;
    if (type === 'tabs') {
      PopoverContentType = TabsPopoverContent;
    } else if (type === 'menu') {
      PopoverContentType = MenuPopoverContent;
    } else {
      throw new Error(
        'Invalid type found in Cascader, only tabs and menu are allowed'
      );
    }

    return (
      <PopoverContent>
        <PopoverContentType
          prefix={prefix}
          i18n={i18n}
          value={value}
          isLoading={isLoading}
          loadingStage={loadingStage}
          clickHandler={this.clickHandler}
          activeId={activeId}
          onTabChange={this.onTabChange}
          title={title}
          recursiveNextOptions={this.recursiveNextOptions}
          options={options}
          ref={ref => (this.cascader = ref)}
        />
      </PopoverContent>
    );
  }

  render() {
    return (
      <Receiver defaultI18n={I18nDefault} componentName="Cascader">
        {i18n => {
          let { prefix, className, popClassName, placeholder } = this.props;
          let { activeValue, open } = this.state;

          let cascaderValue = placeholder || i18n.placeholder;
          let hasValue = false;
          if (activeValue && activeValue.length > 0) {
            hasValue = true;
            if (this.props.displayText) {
              cascaderValue = this.props.displayText(activeValue);
            } else {
              cascaderValue = activeValue.map(valueItem => {
                return valueItem.title;
              });
              cascaderValue = cascaderValue.join(' / ');
            }
          }

          let cascaderCls = classnames({
            [`${prefix}-cascader`]: true,
            [className]: true,
            open,
          });

          let selectTextCls = classnames({
            [`${prefix}-cascader__select-text`]: true,
            'is-placeholder': !hasValue,
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
                      <span
                        className={`${prefix}-cascader__select-text-content`}
                      >
                        {cascaderValue}
                      </span>
                      <Icon type="caret-down" />
                    </div>
                  </div>
                </PopoverClickTrigger>
                {this.getPopoverContent(i18n)}
              </Popover>
            </div>
          );
        }}
      </Receiver>
    );
  }
}

export default Cascader;
