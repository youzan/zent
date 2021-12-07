import cx from 'classnames';
import { Component, createRef } from 'react';

// use this only as type, @types/sortablejs and sortablejs cannot be used with `esModuleInterop: false`
import * as _sortableJS from 'sortablejs';

import reorder from '../utils/reorder';
import { EASE_OUT_CUBIC } from '../utils/timingFunctions';

// use this as value
const sortableJS: typeof _sortableJS = (_sortableJS as any).default;

const DRAGGING_CLS = 'zent-sortable--grabbing';

export interface ISortableProps<T>
  extends Omit<_sortableJS.Options, 'onChange'> {
  // zent wrapper api
  tag?: React.ComponentType | string;
  className?: string;
  items?: T[];
  filterClass?: string;
  onChange?: (newItems: T[]) => void;
}

const addElementsDraggingCursor = (selector: string) => {
  document.querySelectorAll(selector).forEach((el: HTMLElement) => {
    el.style.cursor = 'grabbing';
  });
};

const removeElementsDraggingCursor = (selector: string) => {
  document.querySelectorAll(selector).forEach((el: HTMLElement) => {
    el.style.cursor = '';
  });
};

export class Sortable<T> extends Component<ISortableProps<T>> {
  static defaultProps = {
    tag: 'div',
  };

  sortable: _sortableJS;
  containerRef = createRef<HTMLElement>();

  handleAddDraggingCursor = () => {
    const { handle } = this.props;
    addElementsDraggingCursor('html');
    handle && addElementsDraggingCursor(handle);
    this.containerRef.current?.classList.add(DRAGGING_CLS);
  };

  handleRemoveDraggingCursor = () => {
    const { handle } = this.props;
    removeElementsDraggingCursor('html');
    handle && removeElementsDraggingCursor(handle);
    this.containerRef.current?.classList.remove(DRAGGING_CLS);
  };

  private initSortable = () => {
    const { onMove, onEnd, onChange, filterClass, children, ...rest } =
      this.props;

    const instance = this.containerRef.current;
    if (!instance) {
      return;
    }

    const sortableOptions: _sortableJS.Options = {
      filter: filterClass ? `.${filterClass}` : '',
      ghostClass: 'zent-sortable__ghost',
      chosenClass: 'zent-sortable__chosen',
      dragClass: 'zent-sortable__drag',
      fallbackClass: 'zent-sortable__fallback',
      animation: 200,
      easing: EASE_OUT_CUBIC,
      forceFallback: true,
      onChoose: e => {
        this.handleAddDraggingCursor();
        this.props.onChoose?.(e);
      },
      onMove: (e, originalEvent) => {
        const { onMove } = this.props;
        if (onMove) {
          return onMove(e, originalEvent);
        }

        if (filterClass && e.related.classList.contains(filterClass)) {
          return false;
        }

        // insert point is based on direction
        return true;
      },
      onUnchoose: e => {
        this.handleRemoveDraggingCursor();
        this.props.onUnchoose?.(e);
      },
      onEnd: e => {
        const { items, onEnd, onChange } = this.props;
        onEnd && onEnd(e);

        if (!items) {
          return;
        }

        const { oldIndex, newIndex } = e;
        const nextIndex = Math.max(0, Math.min(newIndex, items.length - 1));
        const newItems = reorder(items, oldIndex, nextIndex);
        onChange && onChange(newItems);
      },
      ...rest,
    };

    this.sortable = sortableJS.create(instance, sortableOptions);
  };

  private destroySortableInstance() {
    if (this.sortable) {
      this.sortable.destroy();
      this.sortable = null;
    }
  }

  componentDidMount() {
    this.initSortable();
  }

  componentWillUnmount() {
    this.destroySortableInstance();
  }

  render() {
    const { className, children, tag, handle } = this.props;
    const classString = cx(`zent-sortable`, className, {
      'zent-sortable--handle': handle,
    });
    const Com: any = tag;
    return (
      <Com
        ref={this.containerRef}
        className={classString}
        /* ts-plugin-version-attribute ignores this element, but it may be a tr... */
        data-zv={__ZENT_VERSION__}
      >
        {children}
      </Com>
    );
  }
}

export default Sortable;
