import React, { Component } from 'react';
import get from 'lodash/get';
import omit from 'lodash/omit';
import defer from 'lodash/defer';
import isFunction from 'lodash/isFunction';
import includes from 'lodash/includes';
import isEqual from 'lodash/isEqual';
import isUndefined from 'lodash/isUndefined';
import throttle from 'lodash/throttle';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import cx from 'classnames';
import Input from 'input';
import Popover from 'popover';
import getCaretCoordinates from 'utils/dom/getCaretCoordinates';
import isFirefox from 'utils/isFirefox';
import SelectMenu from 'select-menu';
import { I18nReceiver as Receiver } from 'i18n';
import { Mention as I18nDefault } from 'i18n/default';

import { findMentionAtCaretPosition } from './findMentionAtCaretPosition';
import * as SelectionChangeEventHub from './SelectionChangeEventHub';
import * as Utils from './utils';
import { getPopoverBottomPosition, getPopoverTopPosition } from './position';
import { MENTION_FOUND } from './constants';

const NAV_KEYS = ['up', 'down', 'left', 'right'];
const DEFAULT_STATE = {
  suggestionVisible: false,
  search: null,
};

export default class Mention extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    multiLine: PropTypes.bool,
    position: PropTypes.oneOf(['top', 'bottom']),
    onSearchChange: PropTypes.func,
    suggestions: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.shape({
          value: PropTypes.any.isRequired,
          content: PropTypes.node,
          isGroup: PropTypes.bool,
          isDivider: PropTypes.bool,

          // the props below are preserved for future refactor
          icon: PropTypes.string,
          disabled: PropTypes.bool,
          // active: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
        }),
      ])
    ),
    suggestionNotFoundContent: PropTypes.node,
    triggerText: PropTypes.string,
    prefix: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    multiLine: false,
    position: 'bottom',
    suggestionNotFoundContent: '',
    suggestions: [],
    triggerText: '@',
    prefix: 'zent',
  };

  state = {
    ...DEFAULT_STATE,
    position: undefined,
    placeholder: null,
  };

  BottomPosition = getPopoverBottomPosition(this);
  TopPosition = getPopoverTopPosition(this);

  render() {
    const { multiLine, className, prefix, position, suggestions } = this.props;
    const inputType = multiLine ? 'textarea' : 'text';
    const passThroughProps = omit(this.props, [
      'multiLine',
      'position',
      'suggestions',
      'onSearchChange',
      'suggestionNotFoundContent',
      'loading',
      'triggerText',
      'onChange',
      // 'onFocus',
      'onBlur',
      'onKeyUp',
      'onKeyDown',

      // No custom input type allowed, cuz some input types don't support Selection API
      'type',
    ]);

    const { suggestionVisible } = this.state;

    return (
      <Receiver defaultI18n={I18nDefault} componentName="Mention">
        {i18n => {
          return (
            <Popover
              visible={suggestionVisible}
              onVisibleChange={this.onSuggestionVisibleChange}
              position={
                position === 'bottom' ? this.BottomPosition : this.TopPosition
              }
              display="inline-block"
              wrapperClassName={cx(`${prefix}-mention`, className)}
            >
              <Popover.Trigger.Click
                getNodeForTriggerRefChange={Utils.getInputNodeForTrigger}
              >
                <Input
                  type={inputType}
                  ref={this.saveInputRef}
                  onChange={this.onInputChange}
                  // onFocus={this.onInputFocus}
                  onBlur={this.onInputBlur}
                  onKeyUp={this.onInputKeyUp}
                  onKeyDown={this.onInputKeyDown}
                  onScroll={this.onInputScroll}
                  onWheel={this.onInputScroll}
                  onCompositionStart={this.onInputCompositionStart}
                  onCompositionEnd={this.onInputCompositionEnd}
                  {...passThroughProps}
                />
              </Popover.Trigger.Click>
              <Popover.Content>
                <SelectMenu
                  ref={this.onSuggestionListRefChange}
                  items={Utils.getMenuListItems(suggestions, i18n.noContent)}
                  onRequestClose={this.onCloseMenuList}
                  onSelect={this.onSelectSuggestion}
                />
              </Popover.Content>
            </Popover>
          );
        }}
      </Receiver>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setSuggestionVisible(this.props.value);
    }
  }

  componentDidMount() {
    this.setSuggestionVisible(this.props.value);
  }

  onSuggestionVisibleChange = visible => {
    // Don't open when click on trigger
    // Only open popover when text triggers mention
    if (!visible) {
      this.setStateIfChange(this.getDefaultState());
    }
  };

  onCloseMenuList = () => {
    this.onSuggestionVisibleChange(false);
  };

  onSelectSuggestion = val => {
    this.onCloseMenuList();

    const { value, onChange } = this.props;
    const { placeholder } = this.state;
    const newValue = Utils.replaceSubstring(
      value,
      placeholder.start,
      placeholder.end,
      val
    );

    onChange(newValue.value);

    // Set caret position to the last character of the inserted string
    defer(() => {
      if (this.input) {
        this.input.setSelectionRange(newValue.caret, newValue.caret);
        this.input.blur();
        this.input.focus();
      }
    });
  };

  onInputChange = evt => {
    this.props.onChange(evt.target.value);
  };

  onInputScroll = throttle(() => {
    if (this.state.suggestionVisible) {
      this.setSuggestionVisible();
    }
  }, 16);

  onInputCompositionStart = () => {
    this.__compositing = true;
  };

  onInputCompositionEnd = () => {
    this.__compositing = false;
  };

  // onInputFocus = evt => {
  //   // https://bugs.chromium.org/p/chromium/issues/detail?id=779328
  //   // In Blink, moving focus to event target before setting selection.
  //   // Edge does as same as Chrome.
  //   // defer(this.setSuggestionVisible, this.props.value);
  //   console.log('focus');
  //   this.triggerEventCallback('onFocus', evt);
  // };

  onInputBlur = evt => {
    // console.log('blur');
    if (!this.state.suggestionVisible) {
      this.setStateIfChange(this.getDefaultState());
    }

    this.triggerEventCallback('onBlur', evt);
  };

  onInputKeyUp = evt => {
    // selectionchange event is not consistent in Firefox
    // Do NOT use keydown event, selection is not updated yet when setSuggestionVisible is called
    if (
      isFirefox &&
      (evt.altKey ||
        evt.ctrlKey ||
        evt.metaKey ||
        includes(NAV_KEYS, keycode(evt)))
    ) {
      defer(this.setSuggestionVisible, this.props.value);
    }
    // console.log('keyup');
    this.triggerEventCallback('onKeyUp', evt);
  };

  onInputKeyDown = evt => {
    if (this.state.suggestionVisible && this.suggestionList) {
      const key = keycode(evt);
      if (key === 'up') {
        this.suggestionList.moveFocusIndexUp();
        evt.preventDefault();
      } else if (key === 'down') {
        this.suggestionList.moveFocusIndexDown();
        evt.preventDefault();
      } else if (key === 'enter') {
        this.suggestionList.selectCurrentFocusIndex(evt);
        evt.preventDefault();
      } else if (key === 'esc') {
        this.setStateIfChange(this.getDefaultState());
      }
    }

    this.triggerEventCallback('onKeyDown', evt);
  };

  onSelectionChange = () => {
    this.setSuggestionVisible(this.props.value);
  };

  triggerEventCallback(eventName, evt) {
    const fn = this.props[eventName];
    if (isFunction(fn)) {
      fn(evt);
    }
  }

  saveInputRef = instance => {
    if (this.input) {
      SelectionChangeEventHub.uninstall({
        node: this.input,
        callback: this.onSelectionChange,
      });
    }

    this.input = get(instance, 'input', null);

    if (this.input) {
      SelectionChangeEventHub.install({
        node: this.input,
        callback: this.onSelectionChange,
      });
    }
  };

  onSuggestionListRefChange = instance => {
    this.suggestionList = instance;
  };

  /**
   * A mention is surrounded by spaces
   * @param {string} value
   */
  setSuggestionVisible = value => {
    if (!this.input || this.__compositing) {
      return;
    }

    value = !isUndefined(value) ? value : this.props.value;
    const { triggerText } = this.props;

    const mention = findMentionAtCaretPosition({
      input: this.input,
      value,
      triggerText,
    });
    const newState = this.getDefaultState();

    if (mention.code === MENTION_FOUND) {
      newState.suggestionVisible = true;
      newState.search = Utils.substring(
        value,
        mention.searchStart,
        mention.searchEnd + 1
      );
      newState.position = this.getCaretCoordinates(mention.caretMeasureStart);
      newState.placeholder = {
        start: mention.placeholderStart,
        end: mention.placeholderEnd,
      };
    }

    this.setStateIfChange(newState);
  };

  setStateIfChange(state) {
    const isSearchChanged = state.search !== this.state.search;

    if (!isEqual(this.state, state)) {
      console.log(this.state, state);

      const { onSearchChange } = this.props;
      if (isSearchChanged && isFunction(onSearchChange)) {
        onSearchChange(state.search);
      }

      this.setState(state);
    }
  }

  getCaretCoordinates(start) {
    const position = getCaretCoordinates(this.input, start, { debug: false });
    const { scrollLeft, scrollTop } = this.input;

    if (scrollLeft) {
      position.left = position.left - scrollLeft;
    }

    if (scrollTop) {
      position.top = position.top - scrollTop;
    }

    return position;
  }

  getDefaultState() {
    return {
      ...this.state,
      ...DEFAULT_STATE,
    };
  }
}
