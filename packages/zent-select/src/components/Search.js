/**
 * Search
 */

import React, { Component, PropTypes } from 'react';

class Search extends Component {

  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(ev) {
    this.props.onChange(ev.target.value);
  }

  render() {
    let {
      prefixCls,
      placeholder,
      onFocus
    } = this.props;

    return (
      <div className={`${prefixCls}-search`}>
        <input
          type="text"
          placeholder={placeholder}
          className={`${prefixCls}-filter`}
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
