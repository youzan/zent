// Type definitions for Sortable.js 1.10.0
// Project: https://github.com/RubaXa/Sortable
// Definitions by: Maw-Fox <https://github.com/Maw-Fox>
//                 Maarten Staa <https://github.com/maartenstaa>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.1

export default Sortable;

declare class Sortable {
  options: Sortable.IOptions;
  el: HTMLElement;

  /**
   * Sortable's main constructor.
   * @param element Any variety of HTMLElement.
   * @param options Sortable options object.
   */
  constructor(element: HTMLElement, options: Sortable.IOptions);

  static active: Sortable;
  static utils: Sortable.IUtils;

  /**
   * Creation of new instances.
   * @param element Any variety of HTMLElement.
   * @param options Sortable options object.
   */
  static create(element: HTMLElement, options: Sortable.IOptions): Sortable;

  /**
   * Options getter/setter
   * @param name a Sortable.Options property.
   * @param value a value.
   */
  option<K extends keyof Sortable.IOptions>(
    name: K,
    value: Sortable.IOptions[K]
  ): void;
  option<K extends keyof Sortable.IOptions>(name: K): Sortable.IOptions[K];

  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param element an HTMLElement or selector string.
   * @param selector default: `options.draggable`
   */
  closest(element: HTMLElement, selector?: string): HTMLElement | null;

  /**
   * Sorts the elements according to the array.
   * @param order an array of strings to sort.
   */
  sort(order: ReadonlyArray<string>): void;

  /**
   * Saving and restoring of the sort.
   */
  save(): void;

  /**
   * Removes the sortable functionality completely.
   */
  destroy(): void;

  /**
   * Serializes the sortable's item data-id's (dataIdAttr option) into an array of string.
   */
  toArray(): string[];
}

declare namespace Sortable {
  export interface ISortableEvent extends Event {
    clone: HTMLElement;
    /**
     * previous list
     */
    from: HTMLElement;
    /**
     * dragged element
     */
    item: HTMLElement;
    /**
     * new index within parent
     */
    newIndex: number | undefined;
    /**
     * old index within parent
     */
    oldIndex: number | undefined;
    target: HTMLElement;
    /**
     * list, in which moved element.
     */
    to: HTMLElement;
  }

  export interface IMoveEvent extends Event {
    dragged: HTMLElement;
    draggedRect: IDOMRect;
    from: HTMLElement;
    /**
     * element on which have guided
     */
    related: HTMLElement;
    relatedRect: IDOMRect;
    to: HTMLElement;
    willInsertAfter?: boolean;
  }

  export interface IGroupOptions {
    /**
     * group name
     */
    name: string;
    /**
     * ability to move from the list. clone — copy the item, rather than move.
     */
    pull?:
      | boolean
      | 'clone'
      | ((to: Sortable, from: Sortable) => boolean | string);
    /**
     * whether elements can be added from other lists, or an array of group names from which elements can be taken.
     */
    put?:
      | boolean
      | string
      | ReadonlyArray<string>
      | ((to: Sortable) => boolean);
    /**
     * revert cloned element to initial position after moving to a another list.
     */
    revertClone?: boolean;
  }

  export interface IOptions {
    /**
     * ms, animation speed moving items when sorting, `0` — without animation
     */
    animation?: number;
    /**
     * Class name for the chosen item
     */
    chosenClass?: string;
    dataIdAttr?: string;
    /**
     * time in milliseconds to define when the sorting should start
     */
    delay?: number;
    /**
     * Disables the sortable if set to true.
     */
    disabled?: boolean;
    /**
     * Class name for the dragging item
     */
    dragClass?: string;
    /**
     * Specifies which items inside the element should be draggable
     */
    draggable?: string;
    dragoverBubble?: boolean;
    dropBubble?: boolean;
    /**
     * Class name for the cloned DOM Element when using forceFallback
     */
    fallbackClass?: string;
    /**
     * Appends the cloned DOM Element into the Document's Body
     */
    fallbackOnBody?: boolean;
    /**
     * Specify in pixels how far the mouse should move before it's considered as a drag.
     */
    fallbackTolerance?: number;
    fallbackOffset?: { x: number; y: number };
    /**
     * Selectors that do not lead to dragging (String or Function)
     */
    filter?:
      | string
      | ((
          this: Sortable,
          event: Event | TouchEvent,
          target: HTMLElement,
          sortable: Sortable
        ) => boolean);
    /**
     * ignore the HTML5 DnD behaviour and force the fallback to kick in
     */
    forceFallback?: boolean;
    /**
     * Class name for the drop placeholder
     */
    ghostClass?: string;
    /**
     * To drag elements from one list into another, both lists must have the same group value.
     * You can also define whether lists can give away, give and keep a copy (clone), and receive elements.
     */
    group?: string | IGroupOptions;
    /**
     * Drag handle selector within list items
     */
    handle?: string;
    ignore?: string;
    /**
     * Call `event.preventDefault()` when triggered `filter`
     */
    preventOnFilter?: boolean;
    scroll?: boolean;
    /**
     * if you have custom scrollbar scrollFn may be used for autoscrolling
     */
    scrollFn?: (
      this: Sortable,
      offsetX: number,
      offsetY: number,
      event: MouseEvent
    ) => void;
    /**
     * px, how near the mouse must be to an edge to start scrolling.
     */
    scrollSensitivity?: number;
    /**
     * px
     */
    scrollSpeed?: number;
    /**
     * sorting inside list
     */
    sort?: boolean;
    store?: {
      get: (sortable: Sortable) => string[];
      set: (sortable: Sortable) => void;
    };
    setData?: (dataTransfer: DataTransfer, draggedElement: HTMLElement) => void;
    /**
     * Element dragging started
     */
    onStart?: (event: ISortableEvent) => void;
    /**
     * Element dragging ended
     */
    onEnd?: (event: ISortableEvent) => void;
    /**
     * Element is dropped into the list from another list
     */
    onAdd?: (event: ISortableEvent) => void;
    /**
     * Created a clone of an element
     */
    onClone?: (event: ISortableEvent) => void;
    /**
     * Element is chosen
     */
    onChoose?: (event: ISortableEvent) => void;
    /**
     * Element is unchosen
     */
    onUnchoose?: (event: ISortableEvent) => void;
    /**
     * Changed sorting within list
     */
    onUpdate?: (event: ISortableEvent) => void;
    /**
     * Called by any change to the list (add / update / remove)
     */
    onSort?: (event: ISortableEvent) => void;
    /**
     * Element is removed from the list into another list
     */
    onRemove?: (event: ISortableEvent) => void;
    /**
     * Attempt to drag a filtered element
     */
    onFilter?: (event: ISortableEvent) => void;
    /**
     * Event when you move an item in the list or between lists
     */
    onMove?: (event: IMoveEvent) => boolean;
  }

  interface IUtils {
    /**
     * Attach an event handler function
     * @param element an HTMLElement.
     * @param event an Event context.
     * @param fn
     */
    on(
      element: HTMLElement,
      event: string,
      fn: EventListenerOrEventListenerObject
    ): void;

    /**
     * Remove an event handler function
     * @param element an HTMLElement.
     * @param event an Event context.
     * @param fn a callback.
     */
    off(
      element: HTMLElement,
      event: string,
      fn: EventListenerOrEventListenerObject
    ): void;

    /**
     * Get the values of all the CSS properties.
     * @param element an HTMLElement.
     */
    css(element: HTMLElement): CSSStyleDeclaration;

    /**
     * Get the value of style properties.
     * @param element an HTMLElement.
     * @param prop a property key.
     */
    css<K extends keyof CSSStyleDeclaration>(
      element: HTMLElement,
      prop: K
    ): CSSStyleDeclaration[K];

    /**
     * Set one CSS property.
     * @param element an HTMLElement.
     * @param prop a property key.
     * @param value a property value.
     */
    css<K extends keyof CSSStyleDeclaration>(
      element: HTMLElement,
      prop: K,
      value: CSSStyleDeclaration[K]
    ): void;

    /**
     * Get elements by tag name.
     * @param context an HTMLElement.
     * @param tagName A tag name.
     * @param iterator An iterator.
     */
    find(
      context: HTMLElement,
      tagName: string,
      iterator?: (value: HTMLElement, index: number) => void
    ): NodeListOf<HTMLElement>;

    /**
     * Check the current matched set of elements against a selector.
     * @param element an HTMLElement.
     * @param selector an element selector.
     */
    is(element: HTMLElement, selector: string): boolean;

    /**
     * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
     * @param element an HTMLElement.
     * @param selector an element seletor.
     * @param context a specific element's context.
     */
    closest(
      element: HTMLElement,
      selector: string,
      context?: HTMLElement
    ): HTMLElement | null;

    /**
     * Add or remove one classes from each element
     * @param element an HTMLElement.
     * @param name a class name.
     * @param state a class's state.
     */
    toggleClass(element: HTMLElement, name: string, state: boolean): void;
  }

  interface IDOMRect {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
    x: number;
    y: number;
  }
}
