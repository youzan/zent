import * as React from 'react';
import * as PropTypes from 'prop-types';
import Popover from 'popover';
import noop from 'lodash/noop';

import bem from 'utils/bem';

import Trigger from './trigger'; // customized trigger based on Popover.Trigger.Click
import Popup from './components/Popup'; // customized content based on Popover.Content

import { stringOrNumber } from './utils';
import { KEY_CODE, NONE_SELECTED } from './constants';

export default class Select extends React.Component {
  constructor(props) {
    super(props);
    const { initPopup, data, value, autoActive } = props;
    const options = this.getUniformedOptions(data);
    const selected = this.findSelected(value, options, []);
    const activeIndex = this.findInitialActive(options, autoActive);
    this.state = {
      selected,
      popout: initPopup,
      activeIndex,
      keyword: '',
    };
  }

  static propTypes = {
    mode: PropTypes.oneOf(['base', 'search', 'tags']),
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.number),
    ]),
    onBlur: PropTypes.func,
    prefix: PropTypes.string,
    onFocus: PropTypes.func,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    autoFocus: PropTypes.bool,
    autoWidth: PropTypes.bool,
    className: PropTypes.string,
    initPopup: PropTypes.bool,
    showReset: PropTypes.bool,
    allowReset: PropTypes.bool,
    autoActive: PropTypes.bool,
    optionText: PropTypes.string,
    optionValue: PropTypes.string,
    placeholder: PropTypes.string,
    onAsyncFilter: PropTypes.func,
    popupClassName: PropTypes.string,
  };

  static defaultProps = {
    data: [],
    mode: 'base',
    value: NONE_SELECTED,
    onBlur: noop,
    prefix: 'zent',
    onFocus: noop,
    disabled: false,
    onChange: noop,
    autoFocus: false,
    className: '',
    initPopup: false,
    showReset: false,
    allowReset: false,
    autoActive: true,
    optionText: 'text',
    optionValue: 'value',
    placeholder: '',
    popupClassName: '',
  };

  componentDidMount() {
    this.setPopupWidth(`${this.popover.getTriggerNode().clientWidth + 2}px`);
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    const { value: oldValue } = this.props;
    if (value === oldValue) return;
    if (
      Array.isArray(value) &&
      value.every((v, index) => v === oldValue[index])
    )
      return;
    const options = this.getUniformedOptions(nextProps.data);
    const selected = this.findSelected(value, options);
    this.setState({ selected });
  }

  // return uniformed Object Array from data or children
  getUniformedOptions() {
    const { children, data, optionValue, optionText } = this.props;
    const { keyword = '' } = this.state || {};
    if (children) {
      return (Array.isArray(children)
        ? children.map(({ props, key }) => ({
            ...props,
            key,
            value: props[optionValue],
            text: props.children,
          }))
        : [
            {
              ...children.props,
              key: children.key,
              value: children.props[optionValue],
              text: children.props.children,
            },
          ]
      ).filter(option => option.text.includes(keyword));
    }
    return data
      .map(option => {
        if (stringOrNumber(option)) {
          return { value: option, text: String(option) };
        }
        return {
          value: option[optionValue],
          text: option[optionText],
          ...option,
        };
      })
      .filter(option => option.text.includes(keyword));
  }

  findSelected(value, options, oldSelected = []) {
    if (value === NONE_SELECTED) return [];
    if (Array.isArray(value)) {
      return value.map(v =>
        [...options, ...oldSelected].find(option => option.value === v)
      );
    }
    const maySelected = [...options, ...oldSelected].find(
      option => option.value === value
    );
    return maySelected ? [maySelected] : [];
  }

  setPopupWidth(popupWidth) {
    this.setState({
      popupWidth,
    });
  }

  findInitialActive = (options = [], autoActive) => {
    if (!options.length) return -1;
    if (autoActive) {
      if (options.every(option => option.disabled)) return -1;
      let activeIndex = 0;
      while (options[activeIndex].disabled) {
        activeIndex++;
      }
      return activeIndex;
    }
    return -1;
  };

  getTriggerNode = () => this.popover.triggerInstance;

  locateTailSelected = () => {
    const { selected: selectedOptions } = this.state;
    const options = this.getUniformedOptions();
    const reversedSelected = selectedOptions.slice().reverse();
    return reversedSelected.find(selected =>
      options.some(option => option.value === selected.value)
    );
  };

  onPopupVisibleChange = popout => {
    this.setState({ popout }, this.afterPopupToggle);
  };

  afterPopupToggle = () => {
    const { mode } = this.props;
    const { popout } = this.state;
    if (popout) {
      const latestSelected = this.locateTailSelected();
      const options = this.getUniformedOptions();
      let activeIndex = this.findInitialActive(options, this.props.autoActive);
      if (latestSelected) {
        activeIndex = options.findIndex(
          option => option.value === latestSelected.value
        );
      }
      this.changeActiveIndex(activeIndex);
      if (mode === 'search') {
        this.getTriggerNode().ref.focus();
      }
    } else if (mode === 'tags') {
      this.getTriggerNode().setInputValue('');
    }
  };

  changeActiveIndex = index =>
    this.setState({
      activeIndex: index,
    });

  resetInput = trigger => {
    if (trigger.setInputValue) {
      trigger.setInputValue('');
    }
  };

  changeSelected = option => {
    const { selected } = this.state;
    const { mode, onChange } = this.props;
    const trigger = this.getTriggerNode();

    if (option.disabled) {
      return trigger.ref.focus();
    }

    if (mode === 'tags') {
      return this.setState(
        {
          selected: this.getTagsNextSelected(selected, option),
        },
        () => {
          onChange(selected.map(s => s.value), selected, option.value, option);
          this.resetInput(trigger);
          trigger.ref.focus();
        }
      );
    }

    if (selected.value !== option.value) {
      this.setState(
        {
          selected: [option],
          popout: false,
        },
        () => {
          onChange(option.value, option);
          this.resetInput(trigger);
          if (mode === 'search') {
            trigger.ref.blur();
            trigger.wrapper.focus();
          }
        }
      );
    } else {
      this.setState({ popout: false }, () => {
        this.resetInput(trigger);
        if (mode === 'search') {
          trigger.ref.blur();
          trigger.wrapper.focus();
        }
      });
    }
  };

  getTagsNextSelected = (selectedOptions, option) => {
    if (selectedOptions.some(selected => selected.value === option.value)) {
      return selectedOptions.filter(
        selected => selected.value !== option.value
      );
    }
    return [...selectedOptions, option];
  };

  filterOptions = keyword => {
    if (this.props.onAsyncSearch) {
      return this.props.onAsyncSearch(keyword);
    }
    this.setState(
      {
        keyword,
      },
      () => {
        if (this.props.mode !== 'tags') {
          const options = this.getUniformedOptions();
          const activeIndex = this.findInitialActive(
            options,
            this.props.autoActive
          );
          this.setState({ activeIndex });
        }
      }
    );
  };

  activeDown = () => {
    const options = this.getUniformedOptions();
    if (options.every(option => option.disabled)) return -1;
    const maxIndex = options.length - 1;
    const { activeIndex } = this.state;
    let nextActive = activeIndex === maxIndex ? 0 : activeIndex + 1;
    while (options[nextActive].disabled) {
      nextActive++;
      if (nextActive > maxIndex) {
        nextActive = 0;
      }
    }
    return nextActive;
  };

  activeUp = () => {
    const options = this.getUniformedOptions();
    if (options.every(option => option.disabled)) return -1;
    const { activeIndex } = this.state;
    let nextActive = activeIndex === 0 ? options.length - 1 : activeIndex - 1;
    while (options[nextActive].disabled) {
      nextActive--;
      if (nextActive < 0) {
        nextActive = options.length - 1;
      }
    }
    return nextActive;
  };

  keyDownHandler = event => {
    const code = event.keyCode;
    const { activeIndex, popout } = this.state;
    const options = this.getUniformedOptions();
    switch (code) {
      case KEY_CODE.DOWN:
        event.preventDefault();
        return this.changeActiveIndex(this.activeDown());
      case KEY_CODE.UP:
        event.preventDefault();
        return this.changeActiveIndex(this.activeUp());
      case KEY_CODE.EN:
        if (!popout) {
          return this.setState({ popout: true }, this.afterPopupToggle);
        }
        return this.changeSelected(options[activeIndex]);
      case KEY_CODE.ESC:
        return this.setState({ popout: false }, this.afterPopupToggle);
      default:
        return null;
    }
  };

  reset = event => {
    if (event) event.stopPropagation();
    this.setState(
      {
        selected: [],
        popout: false,
      },
      () => this.props.onChange(NONE_SELECTED)
    );
  };

  render() {
    const {
      Content,
      Position: { AutoBottomLeft },
    } = Popover;
    const {
      mode,
      onBlur,
      prefix,
      onFocus,
      disabled,
      className,
      allowReset,
      popupClass,
      placeholder,
    } = this.props;

    const { popout, selected, popupWidth, activeIndex } = this.state;
    const options = this.getUniformedOptions();
    const cn = bem({ prefix, block: '-select' });

    return (
      <Popover
        display="inline-block"
        ref={popover => (this.popover = popover)}
        position={AutoBottomLeft}
        visible={popout}
        className={cn('popover', { [mode]: true }, popupClass)}
        wrapperClassName={cn(
          null,
          { disabled, [mode]: true, root: true },
          className
        )}
        onVisibleChange={this.onPopupVisibleChange}
      >
        <Trigger
          _cn={cn}
          mode={mode}
          reset={this.reset}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          selected={selected}
          allowReset={allowReset}
          placeholder={placeholder}
          onTagDelete={this.changeSelected}
          onSearch={this.filterOptions}
          onKeyDown={this.keyDownHandler}
        />
        <Content>
          <Popup
            _cn={cn}
            mode={mode}
            activeIndex={activeIndex}
            options={options}
            selected={selected}
            width={popupWidth}
            changeActiveIndex={this.changeActiveIndex}
            onClick={this.changeSelected}
          />
        </Content>
      </Popover>
    );
  }
}
