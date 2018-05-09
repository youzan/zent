import * as React from 'react';

class SearchTrigger extends React.Component {
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
    if (this.props.disabled) return;
    const { open, contentVisible } = this.props;
    if (!contentVisible) {
      open();
    }
    this.ref.focus();
  };

  getInputDOMNode = () => this.ref;

  onKeyDown = event => {
    if (this.props.disabled) return;
    this.props.onKeyDown(event);
  };

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
    const {
      _cn: cn,
      reset,
      onBlur,
      onFocus,
      disabled,
      selected,
      allowReset,
      placeholder,
    } = this.props;
    const { inputValue } = this.state;

    return (
      <div
        ref={node => (this.wrapper = node)}
        onClick={this.onTriggerClick}
        tabIndex="-1"
        className={cn('search-trigger', { disabled })}
        onKeyDown={this.onKeyDown}
      >
        <div
          className={cn('placeholder')}
          style={{
            display: inputValue || selected.length ? 'none' : 'block',
          }}
        >
          {placeholder}
        </div>
        <div
          className={cn('selected-text')}
          style={{
            display: inputValue || !selected.length ? 'none' : 'inline-block',
          }}
        >
          {selected[0] && selected[0].text}
        </div>
        <div className={cn('search')}>
          <div className={cn('field-wrapper')}>
            <input
              tabIndex="0"
              ref={node => (this.ref = node)}
              value={inputValue}
              onBlur={onBlur}
              onFocus={onFocus}
              onChange={this.onInputChange}
              className={cn('field')}
              onKeyDown={this.onKeyDown}
              autoComplete="off"
            />
            <span>&nbsp;</span>
          </div>
        </div>
        {allowReset && <span className={cn('reset')} onClick={reset} />}
      </div>
    );
  }
}

export default SearchTrigger;
