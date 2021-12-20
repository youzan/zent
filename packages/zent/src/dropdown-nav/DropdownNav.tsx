import {
  Dropdown,
  DropdownContent,
  DropdownButton,
  DropdownClickTrigger,
  DropdownHoverTrigger,
  DropdownPosition,
} from '../dropdown';
import { useMemo, ElementType } from 'react';
import Menu, { MenuItem } from '../menu';

interface INavListItem {
  key: string;
  label: string;
}

interface IDropdownNavProps {
  navTitle: string;
  navList?: INavListItem[];
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

export const DropdownNav: React.FC<IDropdownNavProps> = ({
  navTitle = '下拉导航',
  navList = [],
  trigger = 'hover',
  onItemClick,
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
          {navTitle}
        </DropdownButton>
      </TriggerButton>
      <DropdownContent>
        <Menu onClick={onItemClick}>
          {navList.map(item => (
            <MenuItem key={item.key}>{item.label}</MenuItem>
          ))}
        </Menu>
      </DropdownContent>
    </Dropdown>
  );
};
