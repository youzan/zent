/**
 * InputTrigger
 */

import React, { Component, PropTypes } from 'react';
import assign from 'object-assign';

class InputTrigger extends Component {

  constructor(props) {
    super(props);
    this.state = assign({
      value: ''
    }, props);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }

  componentDidMount() {
    this.props.onChange({
      extraFilter: true
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  inputChangeHandler(ev) {
    this.props.onChange({
      selectedItem: {
        value: ev.target.value
      }
    });
  }

  render() {
    let { prefixCls } = this.props;

    let { value } = this.state;

    return <input className={`${prefixCls}-input`} {...this.props} type="text" value={value} onChange={this.inputChangeHandler} />;
  }
}

InputTrigger.propTypes = {
  prefixCls: PropTypes.string,
  value: PropTypes.any,
  placeholder: PropTypes.string
};

export default InputTrigger;
