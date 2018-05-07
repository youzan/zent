import * as React from 'react';

import Tag from '../components/Tag';

class TagsTrigger extends React.Component {
  state = {
    inputValue: '',
  };

  onInputChange = event => {
    const value = event.target.value;
    const { open, contentVisible } = this.props;
    this.setInputValue(value);
    if (!contentVisible && value) {
      setTimeout(open, 1);
    }
  };

  onTriggerClick = () => {
    const { open, contentVisible, disabled } = this.props;
    if (!contentVisible && !disabled) {
      open();
    }
    this.ref.focus();
  };

  getInputDOMNode = () => this.ref;

  fabricateOnTagDelete = option => event => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onTagDelete(option);
  };

  onKeyDown = event => {
    const { selected, onTagDelete, onKeyDown } = this.props;
    const { inputValue } = this.state;
    const code = event.keyCode;
    if (code === 8 && !inputValue && selected.length) {
      onTagDelete(selected[selected.length - 1]);
    } else {
      onKeyDown(event);
    }
  };

  componentDidMount() {
    const { autoFocus } = this.props;
    if (autoFocus) {
      this.ref.focus();
    }
  }

  setInputValue(inputValue, fireSearch = true) {
    this.setState(
      {
        inputValue,
      },
      () => {
        if (fireSearch) {
          this.fireSearch(inputValue);
        }
      }
    );
  }

  fireSearch(keyword) {
    this.props.onSearch(keyword);
  }

  render() {
    const { _cn: cn, disabled, selected, placeholder } = this.props;
    const { inputValue } = this.state;

    return (
      <div
        className={cn('tags-trigger', { disabled })}
        onClick={this.onTriggerClick}
      >
        <div
          className={cn('placeholder')}
          style={{
            display: inputValue || selected.length ? 'none' : 'block',
          }}
        >
          {placeholder}
        </div>
        <ul>
          {selected.map(option => (
            <Tag
              _cn={cn}
              className={cn('tag')}
              key={option.value}
              text={option.text}
              onDelete={this.fabricateOnTagDelete(option)}
            />
          ))}
          <li className={cn('search')}>
            <div className={cn('field-wrapper')}>
              <input
                tabIndex="0"
                autoComplete="off"
                ref={node => (this.ref = node)}
                className={cn('field')}
                value={inputValue}
                onChange={this.onInputChange}
                onKeyDown={this.onKeyDown}
              />
              <span>&nbsp;</span>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default TagsTrigger;
