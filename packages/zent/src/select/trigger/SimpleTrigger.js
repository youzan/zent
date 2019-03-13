import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import cx from 'classnames';

import { I18nReceiver as Receiver } from 'i18n';

class SimpleTrigger extends PureComponent {
  render() {
    const { prefixCls, onClick, visible } = this.props;
    const rootClass = cx(`${prefixCls}-simple`, { visible });

    return (
      <Receiver componentName="Select">
        {i18n => (
          <div className={rootClass} onClick={onClick}>
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

SimpleTrigger.propTypes = {
  prefixCls: PropTypes.string,
  value: PropTypes.any,
  text: PropTypes.any,
  placeholder: PropTypes.string,
};

export default SimpleTrigger;
