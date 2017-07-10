import PropTypes from 'prop-types';
import React, { PureComponent, Component } from 'react';

class InputTrigger extends (PureComponent || Component) {
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
    let { prefixCls, placeholder, keyword, text } = this.props;

    return (
      <input
        ref={input => (this.input = input)}
        className={`${prefixCls}-input`}
        placeholder={placeholder}
        type="text"
        value={keyword === null ? text : keyword}
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
