import * as React from 'react';
import { Component } from 'react';
import cx from 'classnames';
import * as sortableJS from 'sortablejs';
import reorder from '../utils/reorder';

export type SortableGroup =
  | {
      name: string;
      pull:
        | boolean
        | 'clone'
        | ((to: sortableJS, from: sortableJS) => string | boolean);
      put:
        | string
        | boolean
        | ReadonlyArray<string>
        | ((to: sortableJS) => boolean);
      revertClone: boolean;
    }
  | string;

export interface ISortableProps {
  // base api
  className?: string;
  prefix?: string;
  tag?: string;
  items?: any[];
  onChange?: (newItems: any[]) => void;
  filterClass?: string;

  // advance api
  sort?: boolean;
  group?: string | SortableGroup;
  delay?: number;
  animation?: number;
  handle?: string;
  ghostClass?: string;
  chosenClass?: string;
  dragClass?: string;
  forceFallback?: boolean;
  fallbackClass?: string;
  fallbackOnBody?: boolean;
  fallbackTolerance?: number;
  scroll?: boolean;
  scrollFn?: (
    offsetX: number,
    offsetY: number,
    originalEvent: MouseEvent
  ) => any;
  scrollSensitivity?: number;
  scrollSpeed?: number;
  setData?: (dataTransfer: DataTransfer, dragEl: HTMLElement) => any;
  onStart?: (event: Event) => any;
  onEnd?: (event: Event) => any;
  onAdd?: (event: Event) => any;
  onUpdate?: (event: Event) => any;
  onSort?: (event: Event) => any;
  onRemove?: (event: Event) => any;
  onFilter?: (event: Event) => any;
  onMove?: (event: Event) => boolean;
  onClone?: (event: Event) => boolean;
}

export class Sortable extends Component<ISortableProps> {
  static defaultProps = {
    prefix: 'zent',
    tag: 'div',
  };

  sortable: sortableJS;

  initSortable = (instance: HTMLElement) => {
    const {
      prefix,
      onMove,
      onEnd,
      onChange,
      filterClass,
      children,
      ...rest
    } = this.props;

    if (!instance) {
      return;
    }

    const sortableOptions: sortableJS.Options = {
      filter: filterClass ? `.${filterClass}` : '',
      ghostClass: `${prefix}-ghost`,
      chosenClass: `${prefix}-chosen`,
      dragClass: `${prefix}-drag`,
      fallbackClass: `${prefix}-fallback`,
      onMove: e => {
        if (onMove) {
          return onMove(e);
        }

        return e.related.className !== filterClass;
      },
      onEnd: e => {
        const { items } = this.props;

        onEnd && onEnd(e);

        if (!items) {
          return;
        }

        const { oldIndex, newIndex } = e;
        const newItems = reorder(items, oldIndex, newIndex);

        onChange && onChange(newItems);
      },
      ...rest,
    };

    this.sortable = sortableJS.create(instance, sortableOptions);
  };

  componentWillUnmount() {
    if (this.sortable) {
      this.sortable.destroy();
      this.sortable = null;
    }
  }

  render() {
    const { prefix, className, children, tag } = this.props;
    const classString = cx(`${prefix}-sortable`, className);
    const Com: any = tag;
    return (
      <Com
        ref={instance => this.initSortable(instance)}
        className={classString}
      >
        {children}
      </Com>
    );
  }
}

export default Sortable;
