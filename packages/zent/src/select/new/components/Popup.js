/**
 * Popup
 */

import * as React from 'react';
import { findDOMNode } from 'react-dom';
import Popover from 'popover';
import noop from 'lodash/noop';

import scroll from 'utils/scroll';

import Option from './Option';

class Popup extends React.Component {
  componentDidMount() {
    this.scrollActiveIntoView();
  }

  componentDidUpdate() {
    this.scrollActiveIntoView();
  }

  fabricateOnMouseEnter = index => () => this.props.changeActiveIndex(index);

  fabricateOnClick = option => () => this.props.onClick(option);

  scrollActiveIntoView = () => {
    const optionGroup = findDOMNode(this.group);
    const activeItem = findDOMNode(this.activeItem);

    if (!activeItem) {
      return;
    }

    const groupPos = {
      top: optionGroup.scrollTop,
      bottom: optionGroup.scrollTop + optionGroup.clientHeight,
    };

    const activePos = {
      top: activeItem.offsetTop,
      bottom: activeItem.offsetTop + activeItem.clientHeight,
    };

    // no need scroll
    if (activePos.top >= groupPos.top && activePos.bottom <= groupPos.bottom) {
      return;
    }

    if (activePos.bottom > groupPos.bottom) {
      return scroll(
        optionGroup,
        0,
        activePos.bottom - optionGroup.clientHeight,
        150
      );
    }

    if (activePos.top < groupPos.top) {
      return scroll(optionGroup, 0, activePos.top, 150);
    }
  };

  render() {
    const {
      _cn: cn,
      width,
      options,
      prefix,
      activeIndex,
      mode,
      selected,
    } = this.props;

    const popupStyle = { width };

    return (
      <div style={popupStyle} className={cn('popup', { [mode]: true })}>
        <ul className={cn('options')} ref={group => (this.group = group)}>
          {options.length ? (
            options.map((option, index) => (
              <Option
                _cn={cn}
                key={option.value}
                ref={
                  index === activeIndex
                    ? activeItem => (this.activeItem = activeItem)
                    : null
                }
                active={index === activeIndex}
                selected={selected.some(
                  sOption => sOption.value === option.value
                )}
                onMouseEnter={this.fabricateOnMouseEnter(index)}
                onClick={this.fabricateOnClick(option)}
                prefix={prefix}
                text={option.text}
              />
            ))
          ) : (
            <Option
              _cn={cn}
              key="NOT_FOUND"
              disabled
              text="Not Found"
              onClick={noop}
            />
          )}
        </ul>
      </div>
    );
  }
}

export default Popover.withPopover(Popup);
