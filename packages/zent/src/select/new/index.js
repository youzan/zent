import * as React from 'react';
import * as PropTypes from 'prop-types';
import Popover from 'popover';
import noop from 'lodash/noop';

import bem from 'utils/bem';

import Trigger from './trigger'; // simple package for Popover.Trigger.Click
import Popup from './components/Popup'; // simple package for Popover.Content

import { stringOrNumber } from './utils';
import { KEY_CODE, NONE_SELECTED } from './constants';

export default class Select extends React.Component {
  static propTypes = {
    mode: PropTypes.oneOf(['base', 'search', 'tags']),
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.number),
    ]),
    popout: PropTypes.bool,
    prefix: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    autoFocus: PropTypes.bool,
    autoWidth: PropTypes.bool,
    className: PropTypes.string,
    showReset: PropTypes.bool,
    autoActive: PropTypes.bool,
    optionText: PropTypes.string,
    optionValue: PropTypes.string,
    placeholder: PropTypes.string,
    onAsyncFilter: PropTypes.func,
    popupClassName: PropTypes.string,
  };

  static defaultProps = {
    mode: 'base',
    value: NONE_SELECTED,
    popout: false,
    prefix: 'zent',
    disabled: false,
    onChange: noop,
    autoFocus: false,
    className: '',
    showReset: false,
    autoActive: true,
    placeholder: '',
    popupClassName: '',
  };

  state = {
    // popover visible
    popout: false,
    // selected options. its length assumed to be 1 for Single Select
    selected: [],
    // css width property of popover content
    popupWidth: '0px',
    // the active index of rendered options
    activeIndex: -1,
  };

  getTriggerNode = () => this.popover.triggerInstance;

  locateTailSelected = () => {
    const { selected: selectedOptions, options } = this.state;
    const reversedSelected = selectedOptions.slice().reverse();
    return reversedSelected.find(selected =>
      options.some(option => option.value === selected.value)
    );
  };

  onPopupVisibleChange = popout => {
    this.setState({ popout }, this.afterPopupToggle);
  };

  afterPopupToggle = () => {
    if (this.state.popout) {
      let activeIndex = this.props.autoActive ? 0 : -1;
      const latestSelected = this.locateLatestSelected();
      if (latestSelected) {
        activeIndex = this.state.options.findIndex(
          option => option.value === latestSelected.value
        );
      }
      this.changeActiveIndex(activeIndex);
    } else {
      this.getTriggerNode().setInputValue('');
    }
  };

  changeActiveIndex = index =>
    this.setState({
      activeIndex: index,
    });

  changeSelected = option => {
    const { selected } = this.state;
    const { mode, onChange } = this.props;
    const trigger = this.getTriggerNode();

    if (mode === 'tags') {
      this.setState(
        {
          selected: this.getTagsNextSelected(selected, option),
        },
        () => {
          onChange(selected, option);
          trigger.setInputValue('');
          trigger.inputRef.focus();
        }
      );
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
    const options = this.getUniformedOptions();
    const nextOptions = options.filter(option =>
      String(option.text).includes(keyword)
    );
    this.setState({
      options: nextOptions,
    });
  };

  keyDownHandler = event => {
    const code = event.keyCode;
    const { activeIndex, options } = this.state;
    const maxIndex = options.length - 1;
    switch (code) {
      case KEY_CODE.DOWN:
        event.preventDefault();
        return this.changeActiveIndex(
          activeIndex + 1 > maxIndex ? 0 : activeIndex + 1
        );
      case KEY_CODE.UP:
        event.preventDefault();
        return this.changeActiveIndex(
          activeIndex === 0 ? maxIndex : activeIndex - 1
        );
      case KEY_CODE.EN:
        return this.changeSelected(options[activeIndex]);
      case KEY_CODE.ESC:
        return this.setState({ popout: false });
      default:
    }
  };

  componentWillMount() {
    const { value, datasets, popout, autoActive } = this.props;
    const options = this.getUniformedOptions(datasets);
    const selected = this.findSelected(value, options);
    const activeIndex = autoActive ? 0 : -1;
    this.setState({
      options,
      selected,
      popout,
      activeIndex,
    });
  }

  componentDidMount() {
    this.setPopupWidth(`${this.popover.getTriggerNode().clientWidth + 2}px`);
  }

  getUniformedOptions() {
    const { datasets, optionValue, optionText } = this.props;
    return datasets.map(data => {
      if (stringOrNumber(data)) {
        return { value: data, text: String(data) };
      }
      return { value: data[optionValue], text: data[optionText], ...data };
    });
  }

  findSelected(value, options) {
    if (Array.isArray(value)) {
      return options.filter(option => value.indexOf(option.value) > -1);
    }
    const maySelected = options.find(option => option.value === value);
    return maySelected ? [maySelected] : [];
  }

  setPopupWidth(popupWidth) {
    this.setState({
      popupWidth,
    });
  }

  render() {
    const {
      Content,
      Position: { AutoBottomLeft },
    } = Popover;
    const {
      prefix,
      className,
      popupClass,
      disabled,
      mode,
      placeholder,
    } = this.props;
    const { popout, selected, options, popupWidth, activeIndex } = this.state;

    const cn = bem({ prefix, block: '-select' });

    return (
      <Popover
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
          disabled={disabled}
          selected={selected}
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
