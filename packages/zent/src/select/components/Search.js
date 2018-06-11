import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

class Search extends PureComponent {
  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
    this.focused = false;
  }

  componentWillReceiveProps(nextProps) {
    if (!this.focused && nextProps.ready) {
      setTimeout(() => {
        this.input.focus();
      }, 150);
      this.focused = true;
    }
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
  placeholder: PropTypes.string,
};

export default Search;
