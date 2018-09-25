import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import { I18nReceiver as Receiver } from 'i18n';
import { Select as I18nDefault } from 'i18n/default';

class SelectTrigger extends PureComponent {
  render() {
    const { prefixCls, onClick } = this.props;

    return (
      <Receiver componentName="Select" defaultI18n={I18nDefault}>
        {i18n => (
          <div className={`${prefixCls}-text`} onClick={onClick}>
            {this.props.text || (
              <span className={`${prefixCls}-placeholder`}>
                {this.props.placeholder || i18n.input}
              </span>
            )}
          </div>
        )}
      </Receiver>
    );
  }
}

SelectTrigger.propTypes = {
  prefixCls: PropTypes.string,
  value: PropTypes.any,
  text: PropTypes.any,
  placeholder: PropTypes.string,
};

export default SelectTrigger;
