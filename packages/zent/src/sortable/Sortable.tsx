import cx from 'classnames';
import { Component, createRef } from 'react';

// use this only as type, @types/sortablejs and sortablejs cannot be used with `esModuleInterop: false`
import * as _sortableJS from 'sortablejs';

import reorder from '../utils/reorder';

// use this as value
const sortableJS: typeof _sortableJS = (_sortableJS as any).default;

export interface ISortableProps<T>
  extends Omit<_sortableJS.Options, 'onChange'> {
  // zent wrapper api
  tag?: React.ComponentType | string;
  className?: string;
  items?: T[];
  filterClass?: string;
  onChange?: (newItems: T[]) => void;
}

export class Sortable<T> extends Component<ISortableProps<T>> {
  static defaultProps = {
    tag: 'div',
  };

  sortable: _sortableJS;
  containerRef = createRef<HTMLElement>();

  initSortable = () => {
    const {
      onMove,
      onEnd,
      onChange,
      filterClass,
      children,
      ...rest
    } = this.props;

    const instance = this.containerRef.current;
    if (!instance) {
      return;
    }

    const sortableOptions: _sortableJS.Options = {
      filter: filterClass ? `.${filterClass}` : '',
      ghostClass: `zent-ghost`,
      chosenClass: `zent-chosen`,
      dragClass: `zent-drag`,
      fallbackClass: `zent-fallback`,
      onMove: (e, originalEvent) => {
        if (onMove) {
          return onMove(e, originalEvent);
        }

        if (filterClass && e.related.classList.contains(filterClass)) {
          return false;
        }

        // insert point is based on direction
        return true;
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

  destorySortableInstance() {
    if (this.sortable) {
      this.sortable.destroy();
      this.sortable = null;
    }
  }

  componentDidMount() {
    this.initSortable();
  }

  componentWillUnmount() {
    this.destorySortableInstance();
  }

  render() {
    const { className, children, tag } = this.props;
    const classString = cx(`zent-sortable`, className);
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
