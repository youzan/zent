import PropTypes from 'prop-types';
import React, { Component, PureComponent } from 'react';

import { I18nReceiver as Receiver } from 'i18n';
import { Select as I18nDefault } from 'i18n/default';

class SimpleTrigger extends (PureComponent || Component) {
  render() {
    const { prefixCls, onClick } = this.props;

    return (
      <Receiver componentName="Select" defaultI18n={I18nDefault}>
        {i18n => (
          <div className={`${prefixCls}-simple`} onClick={onClick}>
            {this.props.text || this.props.placeholder || i18n.input}
          </div>
        )}
      </Receiver>
    );
  }
}

SimpleTrigger.propTypes = {
  prefixCls: PropTypes.string,
  value: PropTypes.any,
  text: PropTypes.any,
  placeholder: PropTypes.string
};

export default SimpleTrigger;
