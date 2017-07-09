import React from 'react';
import Popover from 'popover';

import Simple from './Simple';
import Select from './Select';
import Input from './Input';
import Tags from './Tags';

const triggers = { Simple, Select, Input, Tags };

const Base = Popover.Trigger.Click;

class TriggerWrapper extends Base {
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
    const Trigger = triggers[this.props.triggerType];
    const child = <Trigger {...this.props} />;

    return React.cloneElement(child, {
      ref: this.props.onTriggerRefChange,
      ...this.getTriggerProps(child)
    });
  }
}

export default TriggerWrapper;
