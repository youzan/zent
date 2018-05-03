import React, { Component } from 'react';
import get from 'lodash/get';
import omit from 'lodash/omit';
import defer from 'lodash/defer';
import findIndex from 'lodash/findIndex';
import findLastIndex from 'lodash/findLastIndex';
import isFunction from 'lodash/isFunction';
import includes from 'lodash/includes';
import isEqual from 'lodash/isEqual';
import isUndefined from 'lodash/isUndefined';
import throttle from 'lodash/throttle';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Input from 'input';
import Popover from 'popover';
import getCaretCoordinates from 'utils/dom/getCaretCoordinates';
import isFirefox from 'utils/isFirefox';

import * as SelectionChangeEventHub from './SelectionChangeEventHub';

const NAV_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
const DEFAULT_STATE = {
  suggestionVisible: false,
  search: null,
};

/**
 * 中文输入法空格问题
 * 滚动时候弹层如何处理
 */
export default class Mention extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    multiLine: PropTypes.bool,
    position: PropTypes.oneOf(['top', 'bottom']),
    onSearchChange: PropTypes.func,
    suggestions: PropTypes.array,
    suggestionNotFoundContent: PropTypes.node,
    triggerText: PropTypes.string,
    prefix: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    multiLine: false,
    position: 'bottom',
    // FIXME: i18n support
    suggestionNotFoundContent: '无匹配结果，轻敲空格完成输入',
    triggerText: '@',
    prefix: 'zent',
  };

  state = {
    ...DEFAULT_STATE,
    position: undefined,
  };

  render() {
    const { multiLine, className, prefix, position } = this.props;
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

      // No custom input type allowed, cuz some input types don't support Selection API
      'type',
    ]);

    const { suggestionVisible } = this.state;

    return (
      <Popover
        visible={suggestionVisible}
        onVisibleChange={this.onSuggestionVisibleChange}
        position={
          position === 'bottom'
            ? this.getPopoverBottomPosition
            : this.getPopoverTopPosition
        }
        display="inline-block"
        wrapperClassName={cx(`${prefix}-mention`, className)}
      >
        <Popover.Trigger.Click>
          <Input
            type={inputType}
            ref={this.saveRef}
            onChange={this.onInputChange}
            // onFocus={this.onInputFocus}
            onBlur={this.onInputBlur}
            onKeyUp={this.onInputKeyUp}
            onScroll={this.onInputScroll}
            onWheel={this.onInputScroll}
            onCompositionStart={this.onInputCompositionStart}
            onCompositionEnd={this.onInputCompositionEnd}
            {...passThroughProps}
          />
        </Popover.Trigger.Click>
        <Popover.Content>
          <div style={{ border: '1px solid red' }}>foobar</div>
        </Popover.Content>
      </Popover>
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
      this.setStateIfChange(DEFAULT_STATE);
    }
  };

  getPopoverBottomPosition = Popover.Position.create(
    (anchorBoundingBox, containerBoundingBox, contentDimension, options) => {
      return {
        getCSSStyle: () => {
          const { left, top, right, bottom } = anchorBoundingBox;
          // const contentHeight = contentDimension.height;
          const { position } = this.state;
          let x = left + position.left;
          let y = top + options.cushion + position.top + position.height;
          const inputStyles = getComputedStyle(this.input);
          const leftSpace =
            parseInt(inputStyles.paddingLeft, 10) +
            parseInt(inputStyles.borderLeftWidth, 10);
          const rightSpace =
            parseInt(inputStyles.paddingRight, 10) +
            parseInt(inputStyles.borderRightWidth, 10);

          if (x > right - rightSpace) {
            x = right - rightSpace;
          }
          if (x < left + leftSpace) {
            x = left + leftSpace;
          }

          if (y < top) {
            y = top;
          }
          if (y > bottom) {
            y = bottom;
          }

          return {
            position: 'absolute',
            left: `${Math.round(x)}px`,
            top: `${Math.round(y)}px`,
          };
        },

        name: 'position-mention-bottom-left',
      };
    }
  );

  getPopoverTopPosition = Popover.Position.create(
    (anchorBoundingBox, containerBoundingBox, contentDimension, options) => {
      return {
        getCSSStyle: () => {
          const { left, top, right, bottom } = anchorBoundingBox;
          const contentHeight = contentDimension.height;
          const { position } = this.state;
          let x = left + position.left;
          let y = top - contentHeight - options.cushion + position.top;
          const inputStyles = getComputedStyle(this.input);
          const leftSpace =
            parseInt(inputStyles.paddingLeft, 10) +
            parseInt(inputStyles.borderLeftWidth, 10);
          const rightSpace =
            parseInt(inputStyles.paddingRight, 10) +
            parseInt(inputStyles.borderRightWidth, 10);

          if (x > right - rightSpace) {
            x = right - rightSpace;
          }
          if (x < left + leftSpace) {
            x = left + leftSpace;
          }

          if (y + contentHeight < top) {
            y = top - contentHeight;
          }
          if (y + contentHeight > bottom) {
            y = bottom - contentHeight;
          }

          return {
            position: 'absolute',
            left: `${Math.round(x)}px`,
            top: `${Math.round(y)}px`,
          };
        },

        name: 'position-mention-top-left',
      };
    }
  );

  onInputChange = evt => {
    this.props.onChange(evt.target.value);
  };

  // Hide popup, it's tricky to update popup position correctly when scrolling
  onInputScroll = throttle(() => {
    this.setSuggestionVisible();
    // this.setStateIfChange(DEFAULT_STATE);
  }, 16);

  onInputCompositionStart = () => {
    console.log('onInputCompositionStart');
    this.__compositing = true;
  };

  onInputCompositionEnd = () => {
    console.log('onInputCompositionEnd');
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
    this.setStateIfChange(DEFAULT_STATE);
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

  onSelectionChange = () => {
    // console.log('selection change');
    this.setSuggestionVisible(this.props.value);
  };

  triggerEventCallback(eventName, evt) {
    const fn = this.props[eventName];
    if (isFunction(fn)) {
      fn(evt);
    }
  }

  saveRef = instance => {
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

  /**
   * A mention is surrounded by spaces
   * @param {string} value
   */
  setSuggestionVisible = value => {
    if (!this.input || this.__compositing) {
      return;
    }

    value = !isUndefined(value) ? value : this.props.value;

    const { selectionEnd } = this.input;

    // Find the first space before caret
    let mentionStartIndex = findLastIndex(
      value,
      isWhiteSpace,
      selectionEnd - 1
    );

    // Don't trigger suggestion if caret is right after the space
    if (mentionStartIndex + 1 === selectionEnd) {
      this.setStateIfChange(DEFAULT_STATE);
      return;
    }

    // Find the next space after caret
    let mentionEndIndex = findIndex(value, isWhiteSpace, selectionEnd);

    // Now try to match triggerText from mentionStartIndex
    let i =
      mentionStartIndex === -1
        ? 0
        : Math.min(mentionStartIndex + 1, value.length - 1);
    let end =
      mentionEndIndex === -1
        ? value.length - 1
        : Math.max(mentionEndIndex - 1, 0);
    const caretStart = i;
    let j = 0;
    const { triggerText } = this.props;
    const triggerEnd = triggerText.length - 1;
    let foundTrigger = true;
    while (j <= triggerEnd) {
      if (i > end || value[i] !== triggerText[j]) {
        foundTrigger = false;
        break;
      }

      i++;
      j++;
    }

    // Extract search keyword and find caret position
    const newState = {
      search: null,
      suggestionVisible: foundTrigger,
      position: this.state.position,
    };
    if (foundTrigger) {
      newState.search = substring(value, i, end + 1);
      newState.position = this.getCaretCoordinates(caretStart);
    }

    this.setStateIfChange(newState);
  };

  setStateIfChange(state) {
    const isSearchChanged = state.search !== this.state.search;
    if (
      state.suggestionVisible !== this.state.suggestionVisible ||
      isSearchChanged ||
      !isEqual(state.position, this.state.position)
    ) {
      console.log(this.state, state);

      const { onSearchChange } = this.props;
      if (isSearchChanged && isFunction(onSearchChange)) {
        onSearchChange(state.search);
      }

      this.setState(state);
    }
  }

  getCaretCoordinates(start) {
    const position = getCaretCoordinates(this.input, start, { debug: true });
    const { scrollLeft, scrollTop } = this.input;

    if (scrollLeft) {
      position.left = position.left - scrollLeft;
    }

    if (scrollTop) {
      position.top = position.top - scrollTop;
    }

    return position;
  }
}

// Return empty string when start is greater than end
function substring(str, start, end) {
  if (start <= end) {
    return str.substring(start, end);
  }

  return '';
}

function isWhiteSpace(c) {
  return /^\s$/.test(c);
}
