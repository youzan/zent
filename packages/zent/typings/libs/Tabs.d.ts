/// <reference types="react" />

declare module 'zent/lib/tabs' {
  interface ITab {
    tab: string | number
    id: string | number
    disabled?: boolean
  }

  interface ITabPanelProps {
    className?: string
    prefix?: string
    actived?: boolean
    tab: React.ReactNode
    id?: string | number,
    onPanelReady?: (id: string | number) => void
    uniqueId?: number
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

  class Tabs extends React.Component<ITabsProps, any> { }

  namespace Tabs {
    class TabPanel extends React.Component<ITabPanelProps, any> { }
  }

  export default Tabs;
}
