/// <reference types="react" />

declare module 'zent/lib/sortable' {
  interface ISortableProps {
    className?: string
    prefix?: string
    items?: Array
    onChange?: Function
    tag?: string
    sort?: boolean
    filterClass?: string
    group?: Object | string
    delay?: number
    animation?: number
    handle?: string
    ghostClass?: string
    chosenClass?: string
    dragClass?: string
    forceFallback?: bool
    fallbackClass?: string
    fallbackOnBody?: bool
    fallbackTolerance?: number
    scroll?: bool
    scrollFn?: Function
    scrollSensitivity?: number
    scrollSpeed?: number
    setData?: Function
    onStart?: Function
    onEnd?: Function
    onAdd?: Function
    onUpdate?: Function
    onSort?: Function
    onRemove?: Function
    onFilter?: Function
    onMove?: Function
    onClone?: Function
  }

  export default class Sortable extends React.Component<ISortableProps, any> {}
}
