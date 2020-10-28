import * as React from 'react';
import { IInnerTab } from '../../types';
import Icon from '../../../icon';
import Popover from '../../../popover';

interface IAnchorOperationProps<Id> {
  tabs: Array<IInnerTab<Id>>;
  onChange: (item: IInnerTab<Id>) => void;
}

const AnchorOperation = <Id extends string | number = string>({
  tabs,
  onChange,
}: IAnchorOperationProps<Id>) => {
  return (
    <Popover position={Popover.Position.BottomLeft} cushion={3}>
      <Popover.Trigger.Hover>
        <Icon type="more" />
      </Popover.Trigger.Hover>
      <Popover.Content>
        <div className="zent-tabs-hidden-tabs">
          {tabs.map(item => (
            <div
              key={item.key}
              className="zent-tabs-hidden-tab"
              onClick={() => onChange(item)}
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
