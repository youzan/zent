/// <reference types="react" />

declare module 'zent/lib/tabs' {
  interface ITab {
    key: string | number
    title: string | number
    disabled?: boolean
  }

  interface ITabPanelProps {
    className?: string
    prefix?: string
    actived?: boolean
    tab: React.ReactNode
    id: string | number,
    onPanelReady?: (id: string | number) => void
    uniqueId?: number
  }

  interface ITabsProps {
    activeId: string
    type?: 'normal' | 'card' | 'slider'
    size?: 'normal' | 'huge'
    align?: 'left' | 'right' | 'center'
    onChange?: (id: string | number) => void
    onDelete?: (id: string | number) => void
    onAdd?: () => void
    candel?: boolean
    canadd?: boolean
    tabs?: Array<ITab>
    className?: string
    prefix?: string
    navExtraContent?: React.ReactNode
  }

  class Tabs extends React.Component<ITabsProps, any> { }

  namespace Tabs {
    class TabPanel extends React.Component<ITabPanelProps, any> { }
  }

  export default Tabs;
}
