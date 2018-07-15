/// <reference types="react" />

declare module 'zent/lib/sortable' {

  type SortableGroup = {
    name: string
    pull: boolean | 'clone' | Function
    put: boolean | Array<string> | Function
    revertClone: boolean
  } | string

  interface ISortableProps {
    // base api
    className?: string
    prefix?: string
    tag?: string
    items?: Array<any>
    onChange?: (newItems: Array<any>) => void
    filterClass?: string

    // advance api
    sort?: boolean
    group?: Object | string
    delay?: number
    animation?: number
    handle?: string
    ghostClass?: string
    chosenClass?: string
    dragClass?: string
    forceFallback?: boolean
    fallbackClass?: string
    fallbackOnBody?: boolean
    fallbackTolerance?: number
    scroll?: boolean
    scrollFn?: Function
    scrollSensitivity?: number
    scrollSpeed?: number
    setData?: (dataTransfer: object, dragEl: HTMLElement) => any
    onStart?: (event: any) => any
    onEnd?: (event: any) => any
    onAdd?: (event: any) => any
    onUpdate?: (event: any) => any
    onSort?: (event: any) => any
    onRemove?: (event: any) => any
    onFilter?: (event: any) => any
    onMove?: (event: any) => boolean
    onClone?: (event: any) => boolean
  }

  export default class Sortable extends React.Component<ISortableProps, any> {}
}
