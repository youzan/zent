/// <reference types="react" />

declare module 'zent/lib/sortable' {

  type SortableGroup = {
    name: string
    pull: boolean | 'clone' | Function
    put: boolean | Array<string> | Function
    revertClone: boolean
  } | string

  interface IMobileScrollOriginalEvent {
    clientX: number
    clientY: number
    rootEl: HTMLDivElement
    target: HTMLElement
  }

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
    group?: string | SortableGroup
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
    scrollFn?: (offsetX: number, offsetY: number, originalEvent: DragEvent | IMobileScrollOriginalEvent) => any
    scrollSensitivity?: number
    scrollSpeed?: number
    setData?: (dataTransfer: DataTransfer, dragEl: HTMLElement) => any
    onStart?: (event: Event) => any
    onEnd?: (event: Event) => any
    onAdd?: (event: Event) => any
    onUpdate?: (event: Event) => any
    onSort?: (event: Event) => any
    onRemove?: (event: Event) => any
    onFilter?: (event: Event) => any
    onMove?: (event: Event) => boolean
    onClone?: (event: Event) => boolean
  }

  export default class Sortable extends React.Component<ISortableProps, any> {}
}
