import * as React from 'react';
import { PureComponent } from 'react';
import cx from 'classnames';

import { I18nReceiver as Receiver } from '../../i18n';

export interface ISelectTriggerProps {
  prefixCls?: string;
  onClick?: React.MouseEventHandler;
  visible?: boolean;
  text?: string;
  placeholder?: string;
}

class SelectTrigger extends PureComponent<ISelectTriggerProps> {
  render() {
    const { prefixCls, onClick, visible } = this.props;
    const rootClass = cx(`${prefixCls}-text`, { visible });

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

export default SelectTrigger;
