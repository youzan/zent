import React, { PureComponent, Component } from 'react';
import Icon from 'icon';
import Input from 'input';
import cx from 'classnames';
import omit from 'lodash/omit';
import assign from 'lodash/assign';
import isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';
import getWidth from 'utils/getWidth';

export default class SearchInput extends (PureComponent || Component) {
  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  static defaultProps = {
    className: '',
    prefix: 'zent'
  };

  render() {
    const { prefix, className, value, width } = this.props;
    const inputProps = omit(this.props, 'className', 'type', 'onChange');

    return (
      <div
        style={getWidth(width)}
        className={cx(`${prefix}-search-input`, className)}
      >
        <Icon type="search" />
        <Input {...inputProps} onChange={this.onChange} />
        {value && (
          <Icon
            type="close-circle"
            onClick={this.clearInput}
            onMouseDown={this.retainInputFocus}
          />
        )}
      </div>
    );
  }

  onChange = evt => {
    this.triggerCustomChangeEvent(evt.target.value, evt);
  };

  clearInput = evt => {
    this.triggerCustomChangeEvent('', evt);
  };

  retainInputFocus = evt => {
    evt.preventDefault();
  };

  triggerCustomChangeEvent(value, evt) {
    const { onChange } = this.props;

    isFunction(onChange) &&
      onChange({
        target: assign({}, this.props, {
          value,
          type: 'search'
        }),
        preventDefault: () => evt.preventDefault(),
        stopPropagation: () => evt.stopPropagation()
      });
  }
}
