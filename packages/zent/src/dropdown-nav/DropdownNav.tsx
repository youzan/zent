import {
  Dropdown,
  DropdownContent,
  DropdownButton,
  DropdownClickTrigger,
  DropdownHoverTrigger,
  DropdownPosition,
} from '../dropdown';
import { useMemo, ElementType, PropsWithChildren, FC } from 'react';
import Menu, { MenuItem } from '../menu';

interface INavListItem {
  key: string;
  label: string;
}

interface IDropdownNavProps {
  list?: INavListItem[];
  trigger?: 'hover' | 'click';
  onItemClick?: (
    e: React.MouseEvent<HTMLDivElement | HTMLLIElement>,
    key: string
  ) => void;
}

const TriggerButtonMap: Record<'hover' | 'click', ElementType> = {
  hover: DropdownHoverTrigger,
  click: DropdownClickTrigger,
};

export const DropdownNav: FC<PropsWithChildren<IDropdownNavProps>> = ({
  list = [],
  trigger = 'hover',
  onItemClick,
  children,
}) => {
  const TriggerButton = useMemo(() => {
    return TriggerButtonMap[trigger];
  }, [trigger]);
  return (
    <Dropdown
      className="zent-dropdown-nav"
      position={DropdownPosition.BottomSameWidth}
    >
      <TriggerButton>
        <DropdownButton className={'zent-dropdown-nav-btn'} type="text">
          {children}
        </DropdownButton>
      </TriggerButton>
      <DropdownContent>
        <Menu onClick={onItemClick}>
          {list.map(item => (
            <MenuItem key={item.key}>{item.label}</MenuItem>
          ))}
        </Menu>
      </DropdownContent>
    </Dropdown>
  );
};
