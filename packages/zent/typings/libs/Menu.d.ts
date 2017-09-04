/// <reference types="react" />

declare module 'zent/lib/menu' {
  interface IMenuProps {
    onClick?: React.UIEventHandler<HTMLDivElement|HTMLLIElement>
    className?: string
    prefix?: string
  }

  class Menu extends React.Component<IMenuProps, any> { }

  namespace Menu {
    interface IMenuItemProps {
      key?: string
      disabled?: boolean
      className?: string
      prefix?: string
    }

    class MenuItem extends React.Component<MenuItem, any> { }

    interface ISubMenuProps {
      title: string
      disabled?: boolean
      overlayClassName?: string
      className?: string
      prefix?: string
    }

    class SubMenu extends React.Component<ISubMenuProps, any> { }
  }

  export default Menu
}
