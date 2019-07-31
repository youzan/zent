import * as React from 'react';
import { Component } from 'react';
import defer from 'lodash-es/defer';
import isFunction from 'lodash-es/isFunction';
import includes from 'lodash-es/includes';
import isEqual from 'lodash-es/isEqual';
import throttle from 'lodash-es/throttle';
import cx from 'classnames';
import Input, { IInputClearEvent } from '../input';
import Popover from '../popover';
import getCaretCoordinates from '../utils/dom/getCaretCoordinates';
import isFirefox from '../utils/isFirefox';
import SelectMenu from '../select-menu';
import { I18nReceiver as Receiver } from '../i18n';

import { findMentionAtCaretPosition } from './findMentionAtCaretPosition';
import * as SelectionChangeEventHub from './SelectionChangeEventHub';
import * as Utils from './utils';
import { getPopoverBottomPosition, getPopoverTopPosition } from './position';
import { MENTION_FOUND } from './constants';

const NAV_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
const DEFAULT_STATE = {
  suggestionVisible: false,
  search: null,
};

export interface ICompoundMentionSuggestion {
  value: unknown;
  content?: React.ReactNode;
  isGroup?: boolean;
  isDivider?: boolean;
  icon?: string;
  disabled?: boolean;
}

export interface IMentionProps {
  value: string;
  onChange: (val: string) => void;
  onSearchChange?: (search: string) => void;
  multiLine?: boolean;
  position?: 'top' | 'bottom';
  suggestions: string | number | ICompoundMentionSuggestion;
  suggestionNotFoundContent?: React.ReactNode;
  triggerText?: string;
  className?: string;
  prefix?: string;
  loading?: boolean;
  type?: string;
  onBlur?: React.FocusEventHandler;
  onKeyUp?: React.FocusEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
}

export class Mention extends Component<IMentionProps> {
  static defaultProps = {
    multiLine: false,
    position: 'bottom',
    suggestionNotFoundContent: '',
    suggestions: [],
    triggerText: '@',
    prefix: 'zent',
  };

  _compositing: boolean;
  input: HTMLInputElement | null = null;
  suggestionList: SelectMenu | null = null;

  state = {
    ...DEFAULT_STATE,
    position: undefined,
    placeholder: null,
  };

  BottomPosition = getPopoverBottomPosition(this);

  TopPosition = getPopoverTopPosition(this);

  render() {
    const {
      multiLine,
      position,
      suggestions,
      onSearchChange,
      suggestionNotFoundContent,
      loading,
      triggerText,
      onChange,
      onBlur,
      onKeyUp,
      onKeyDown,

      // No custom input type allowed, cuz some input types don't support Selection API
      type,

      className,
      prefix,
      ...passThroughProps
    } = this.props;
    const inputType = multiLine ? 'textarea' : 'text';

    const { suggestionVisible } = this.state;

    return (
      <Receiver componentName="Mention">
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
                  {...(passThroughProps as any)}
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

  onInputChange = (
    evt: IInputClearEvent | React.ChangeEvent<HTMLInputElement>
  ) => {
    this.props.onChange(evt.target.value);
  };

  onInputScroll = throttle(() => {
    if (this.state.suggestionVisible) {
      this.setSuggestionVisible();
    }
  }, 16);

  onInputCompositionStart = () => {
    this._compositing = true;
  };

  onInputCompositionEnd = () => {
    this._compositing = false;
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
      (evt.altKey || evt.ctrlKey || evt.metaKey || includes(NAV_KEYS, evt.key))
    ) {
      defer(this.setSuggestionVisible, this.props.value);
    }
    // console.log('keyup');
    this.triggerEventCallback('onKeyUp', evt);
  };

  onInputKeyDown = evt => {
    if (this.state.suggestionVisible && this.suggestionList) {
      const { key } = evt;
      if (key === 'ArrowUp') {
        this.suggestionList.moveFocusIndexUp();
        evt.preventDefault();
      } else if (key === 'ArrowDown') {
        this.suggestionList.moveFocusIndexDown();
        evt.preventDefault();
      } else if (key === 'Enter') {
        this.suggestionList.selectCurrentFocusIndex(evt);
        evt.preventDefault();
      } else if (key === 'Escape') {
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

    this.input = instance && instance.input;

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
  setSuggestionVisible = (value?: unknown) => {
    if (!this.input || this._compositing) {
      return;
    }

    value = value !== undefined ? value : this.props.value;
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

export default Mention;
