import { useState, useCallback } from 'react';
import cn from 'classnames';
import { IInnerTab } from '../../types';
import Icon from '../../../icon';
import Popover from '../../../popover';
import { useEventCallbackRef } from '../../../utils/hooks/useEventCallbackRef';

interface IAnchorOperationProps<Id> {
  tabs: Array<IInnerTab<Id>>;
  onChange: (item: IInnerTab<Id>) => void;
}

const AnchorOperation = <Id extends string | number = string>({
  tabs,
  onChange,
}: IAnchorOperationProps<Id>) => {
  const onChangeRef = useEventCallbackRef(onChange);
  const [visible, setVisible] = useState<boolean>(false);

  const onClick = useCallback(
    item => {
      onChangeRef.current(item);
      !item.disabled && setVisible(false);
    },
    [onChangeRef]
  );

  return (
    <Popover
      position={Popover.Position.BottomLeft}
      cushion={3}
      visible={visible}
      onVisibleChange={setVisible}
    >
      <Popover.Trigger.Hover>
        <Icon type="more" />
      </Popover.Trigger.Hover>
      <Popover.Content>
        <div className="zent-tabs-hidden-tabs">
          {tabs.map(item => (
            <div
              key={item.key}
              className={cn('zent-tabs-hidden-tab', {
                'zent-tabs-hidden-tab-disabled': item.disabled,
              })}
              onClick={() => onClick(item)}
            >
              {item.title}
            </div>
          ))}
        </div>
      </Popover.Content>
    </Popover>
  );
};

export default AnchorOperation;
