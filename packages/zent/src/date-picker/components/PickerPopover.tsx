import Popover, { IPopoverClickTriggerChildProps } from '../../popover';
interface IPickerPopoverProps {
  trigger: React.ReactElement<IPopoverClickTriggerChildProps, any>;
  content: React.ReactNode;
  panelVisible: boolean;
  onVisibleChange: (visible: boolean) => void;
}
const PickerPopover = ({
  trigger,
  content,
  panelVisible,
  onVisibleChange,
}: IPickerPopoverProps) => {
  return (
    <Popover
      className="zent-datepicker-popup"
      cushion={5}
      position={Popover.Position.AutoBottomLeft}
      visible={panelVisible}
      onVisibleChange={onVisibleChange}
    >
      <Popover.Trigger.Click>{trigger}</Popover.Trigger.Click>
      <Popover.Content>{content}</Popover.Content>
    </Popover>
  );
};
export default PickerPopover;
