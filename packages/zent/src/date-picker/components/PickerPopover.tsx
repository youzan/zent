import * as React from 'react';
import Popover from '../../popover';

const PickerPopover = ({ trigger, content, panelVisible, onVisibleChange }) => {
  return (
    <div className="zent-datepicker">
      <Popover
        cushion={5}
        position={Popover.Position.AutoBottomLeft}
        visible={panelVisible}
        onVisibleChange={onVisibleChange}
      >
        <Popover.Trigger.Click>{trigger}</Popover.Trigger.Click>
        <Popover.Content>{content}</Popover.Content>
      </Popover>
    </div>
  );
};
export default PickerPopover;
