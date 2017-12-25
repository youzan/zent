import PropTypes from 'prop-types';
import React, { Component, PureComponent } from 'react';

import { I18nReciever as Reciever } from 'i18n';
import { Select as I18nDefault } from 'i18n/default';

class SelectTrigger extends (PureComponent || Component) {
  render() {
    const { prefixCls, onClick } = this.props;

    return (
      <Reciever componentName="Select" defaultI18n={I18nDefault}>
        {i18n => (
          <div className={`${prefixCls}-text`} onClick={onClick}>
            {this.props.text || this.props.placeholder || i18n.input}
          </div>
        )}
      </Reciever>
    );
  }
}

SelectTrigger.propTypes = {
  prefixCls: PropTypes.string,
  value: PropTypes.any,
  text: PropTypes.any,
  placeholder: PropTypes.string
};

export default SelectTrigger;
