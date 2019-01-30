import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import * as sortableJS from 'sortablejs';
import isFunction from 'lodash-es/isFunction';
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

interface IMobileScrollOriginalEvent {
  clientX: number;
  clientY: number;
  rootEl: HTMLDivElement;
  target: HTMLElement;
}

export interface ISortableProps {
  // base api
  className?: string;
  prefix?: string;
  tag?: string;
  items?: Array<any>;
  onChange?: (newItems: Array<any>) => void;
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

export default class Sortable extends Component<ISortableProps> {
  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    items: PropTypes.array,
    onChange(props, propName, componentName) {
      if (
        (props.items && !props[propName]) ||
        (!props.items && props[propName])
      ) {
        throw new Error(
          'prop items and onChange must appear at the same time.'
        );
      }
      if (props[propName] && !isFunction(props[propName])) {
        throw new Error(
          `Invalid prop ${propName} supplied to ${componentName}, expects a function.`
        );
      }
    },
    tag: PropTypes.string,
    sort: PropTypes.bool,
    filterClass: PropTypes.string,
    group: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    delay: PropTypes.number,
    animation: PropTypes.number,
    handle: PropTypes.string,
    ghostClass: PropTypes.string,
    chosenClass: PropTypes.string,
    dragClass: PropTypes.string,
    forceFallback: PropTypes.bool,
    fallbackClass: PropTypes.string,
    fallbackOnBody: PropTypes.bool,
    fallbackTolerance: PropTypes.number,
    scroll: PropTypes.bool,
    scrollFn: PropTypes.func,
    scrollSensitivity: PropTypes.number,
    scrollSpeed: PropTypes.number,
    setData: PropTypes.func,
    onStart: PropTypes.func,
    onEnd: PropTypes.func,
    onAdd: PropTypes.func,
    onUpdate: PropTypes.func,
    onSort: PropTypes.func,
    onRemove: PropTypes.func,
    onFilter: PropTypes.func,
    onMove: PropTypes.func,
    onClone: PropTypes.func,
  };

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
