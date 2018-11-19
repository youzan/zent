import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';

import { I18nReceiver as Receiver } from 'i18n';
import { Select as I18nDefault } from 'i18n/default';

class InputTrigger extends Component {
  state = {
    value: '',
  };

  componentDidMount() {
    this.props.onChange({
      extraFilter: true,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.value !== this.state.value;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.keyword === null ? nextProps.value : nextProps.keyword,
    });
  }

  inputChangeHandler = ev => {
    this.props.onChange({
      keyword: ev.target.value,
    });
  };

  render() {
    const { prefixCls, placeholder, keyword, text, visible } = this.props;

    const rootClass = cx(`${prefixCls}-input`, { visible });

    return (
      <Receiver componentName="Select" defaultI18n={I18nDefault}>
        {i18n => (
          <input
            ref={input => (this.input = input)}
            className={rootClass}
            placeholder={placeholder || i18n.input}
            type="text"
            value={keyword === null ? text : keyword}
            onChange={this.inputChangeHandler}
            onClick={this.props.onClick}
          />
        )}
      </Receiver>
    );
  }
}

InputTrigger.propTypes = {
  prefixCls: PropTypes.string,
  value: PropTypes.any,
  placeholder: PropTypes.string,
};

export default InputTrigger;
