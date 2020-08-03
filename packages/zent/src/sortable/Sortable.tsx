import cx from 'classnames';
import * as React from 'react';
import * as sortableJS from 'sortablejs';

import reorder from '../utils/reorder';

export interface ISortableProps<T> extends sortableJS.Options {
  // zent wrapper api
  tag?: React.ComponentType | string;
  className?: string;
  items?: T[];
  filterClass?: string;
  onChange?: (newItems: T[]) => void;
}

export class Sortable<T> extends React.Component<ISortableProps<T>> {
  static defaultProps = {
    tag: 'div',
  };

  sortable: sortableJS;
  containerRef = React.createRef<HTMLElement>();

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

    const sortableOptions: sortableJS.Options = {
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

        return 1;
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
