import PropTypes from 'zent-utils/prop-types';
/**
 * InputTrigger
 */

import React, { Component } from 'react';

class InputTrigger extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.inputFocusHandler = this.inputFocusHandler.bind(this);
  }

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

  inputChangeHandler(ev) {
    this.props.onChange({
      open: true,
      keyword: ev.target.value
    });
  }

  inputFocusHandler() {
    this.props.onChange({
      open: true
    });
  }

  render() {
    let {
      prefixCls,
      placeholder
    } = this.props;

    let { value } = this.state;

    return (
      <input
        ref={input => this.input = input}
        className={`${prefixCls}-input`}
        placeholder={placeholder}
        type="text"
        value={value}
        onFocus={this.inputFocusHandler}
        onChange={this.inputChangeHandler}
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
