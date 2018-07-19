/// <reference types="react" />

declare module 'zent/lib/menu' {
  interface IMenuProps {
    onClick?: React.UIEventHandler<HTMLDivElement|HTMLLIElement>
    style?: React.CSSProperties
    mode?: 'pop' | 'inline'
    defaultExpandKeys?: Array<string>
    defaultSelectedKey?: string
    inlineIndent?: number
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

    class MenuItem extends React.Component<IMenuItemProps, any> { }

    interface ISubMenuProps {
      key?: string
      title: React.ReactNode
      disabled?: boolean
      overlayClassName?: string
      className?: string
      prefix?: string
    }

    class SubMenu extends React.Component<ISubMenuProps, any> { }
  }

  export default Menu
}
