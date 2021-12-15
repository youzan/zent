import {
  Dropdown,
  DropdownContent,
  DropdownButton,
  DropdownClickTrigger,
  DropdownHoverTrigger,
  DropdownPosition,
} from '../dropdown';

import Menu, { MenuItem } from '../menu';

interface INavListItem {
  key: string;
  label: string;
}

interface IDropdownNavProps {
  navList?: INavListItem[];
  trigger?: 'hover' | 'click';
  onClick?: (
    e: React.MouseEvent<HTMLDivElement | HTMLLIElement>,
    key: string
  ) => void;
}

export const DropdownNav: React.FC<IDropdownNavProps> = ({
  navList = [],
  trigger = 'hover',
  onClick,
}) => {
  return (
    <Dropdown
      className="zent-dropdown-nav"
      position={DropdownPosition.BottomSameWidth}
    >
      {trigger === 'hover' ? (
        <DropdownHoverTrigger>
          <DropdownButton className={'zent-dropdown-nav-btn'} type="text">
            Hover打开菜单
          </DropdownButton>
        </DropdownHoverTrigger>
      ) : (
        <DropdownClickTrigger>
          <DropdownButton className={'zent-dropdown-nav-btn'} type="text">
            click打开菜单
          </DropdownButton>
        </DropdownClickTrigger>
      )}
      <DropdownContent>
        <Menu onClick={onClick}>
          {navList.map(item => (
            <MenuItem key={item.key}>{item.label}</MenuItem>
          ))}
        </Menu>
      </DropdownContent>
    </Dropdown>
  );
};
