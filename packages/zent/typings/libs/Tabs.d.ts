/// <reference types="react" />

declare module 'zent/lib/tabs' {
  interface ITab {
    tab: string | number
    id: string | number
    disabled?: boolean
  }

  interface ITabsProps {
    activeId: string
    type?: 'normal' | 'card' | 'slider'
    size?: 'normal' | 'huge'
    align?: 'left' | 'right' | 'center'
    onTabChange?: (id: string) => void
    onTabDel?: (id: string) => void
    onTabAdd?: () => void
    candel?: boolean
    canadd?: boolean
    tabs?: Array<ITab>
    className?: string
    prefix?: string
  }

  export default class Tabs extends React.Component<ITabsProps, any> { }
}
