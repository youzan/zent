import * as React from 'react';
import { PureComponent } from 'react';
import cx from 'classnames';

import { I18nReceiver as Receiver } from '../../i18n';

export interface ISimpleTriggerProps {
  prefixCls?: string;
  onClick?: React.MouseEventHandler;
  visible?: boolean;
  text?: string;
  placeholder?: string;
}

class SimpleTrigger extends PureComponent<ISimpleTriggerProps> {
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

export default SimpleTrigger;
