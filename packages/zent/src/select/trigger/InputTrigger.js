import PropTypes from 'prop-types';
import React, { Component } from 'react';

class InputTrigger extends Component {
  state = {
    value: ''
  };

  componentDidMount() {
    this.props.onChange({
      extraFilter: true
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.value !== this.state.value;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.keyword === null ? nextProps.value : nextProps.keyword
    });
  }

  inputChangeHandler = ev => {
    this.props.onChange({
      keyword: ev.target.value
    });
  };

  render() {
    const { prefixCls, placeholder, keyword, text } = this.props;

    return (
      <input
        ref={input => (this.input = input)}
        className={`${prefixCls}-input`}
        placeholder={placeholder}
        type="text"
        value={keyword === null ? text : keyword}
        onChange={this.inputChangeHandler}
        onClick={this.props.onClick}
      />
    );
  }
}

InputTrigger.propTypes = {
  prefixCls: PropTypes.string,
  value: PropTypes.any,
  placeholder: PropTypes.string
};

export default InputTrigger;
