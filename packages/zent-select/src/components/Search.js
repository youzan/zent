/**
 * Search
 */

import React, { Component, PropTypes } from 'react';

class Search extends Component {

  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
  }

  componentDidMount() {
    this.input.focus();
  }

  changeHandler(ev) {
    this.props.onChange(ev.target.value);
  }

  render() {
    let {
      prefixCls,
      placeholder,
      onFocus,
      keyword
    } = this.props;

    return (
      <div className={`${prefixCls}-search`}>
        <input
          type="text"
          ref={input => this.input = input}
          placeholder={placeholder}
          className={`${prefixCls}-filter`}
          value={keyword}
          onChange={this.changeHandler}
          onFocus={onFocus}
        />
      </div>
    );
  }
}

Search.propTypes = {
  prefixCls: PropTypes.string,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func
};

export default Search;
