import React from 'react';
import Popover from 'popover';

import Simple from './Simple';

const Base = Popover.Trigger.Click;

class Trigger extends Base {
  getTriggerProps(child) {
    const { contentVisible, disabled } = this.props;
    return disabled
      ? {}
      : {
          onClick: evt => {
            contentVisible ? this.props.close() : this.props.open();
            this.triggerEvent(child, 'onClick', evt);
          },
          onBlur: evt => {
            this.props.close();
            this.triggerEvent(child, 'onBlur', evt);
          }
        };
  }

  render() {
    const child = <Simple {...this.props} />;

    return React.cloneElement(child, {
      ref: this.props.onTriggerRefChange,
      ...this.getTriggerProps(child)
    });
  }
}

export default Trigger;
