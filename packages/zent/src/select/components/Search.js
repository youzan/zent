import PropTypes from 'prop-types';
import React, { Component, PureComponent } from 'react';

class Search extends (PureComponent || Component) {
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
    const { prefixCls, placeholder, keyword } = this.props;

    return (
      <div className={`${prefixCls}-search`}>
        <input
          type="text"
          ref={input => (this.input = input)}
          placeholder={placeholder}
          className={`${prefixCls}-filter`}
          value={keyword}
          onChange={this.changeHandler}
        />
      </div>
    );
  }
}

Search.propTypes = {
  prefixCls: PropTypes.string,
  value: PropTypes.any,
  placeholder: PropTypes.string
};

export default Search;
