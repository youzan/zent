import cx from 'classnames';
import * as React from 'react';
import * as sortableJS from 'sortablejs';

import reorder from '../utils/reorder';
import {
  unboxDOMNode,
  boxNativeEvent,
  boxDOMNode,
  boxFnArgs,
} from '../utils/alcatraz';

export interface ISortableProps<T> extends sortableJS.Options {
  // zent wrapper api
  tag?: React.ComponentType | string;
  className?: string;
  items?: T[];
  filterClass?: string;
  onChange?: (newItems: T[]) => void;
}

const boxSortableEvent = (event: sortableJS.SortableEvent) => {
  return boxNativeEvent(event, {
    extraWhiteList: {
      allowAccessProps: [
        {
          proxyProps: {
            clone: boxDOMNode,
            from: boxDOMNode,
            item: boxDOMNode,
            to: boxDOMNode,
          },
        },
      ],
    },
  });
};

const boxSortableMoveEvent = (event: sortableJS.MoveEvent) => {
  return boxNativeEvent(event, {
    extraWhiteList: {
      allowAccessProps: [
        {
          proxyProps: {
            dragged: boxDOMNode,
            from: boxDOMNode,
            related: boxDOMNode,
            to: boxDOMNode,
          },
        },
      ],
    },
  });
};

const boxFnPropIfExist = <T extends any>(
  obj: T,
  propName: keyof T,
  argBoxings: Function[]
) => {
  if (obj[propName] && typeof obj[propName] === 'function') {
    obj[propName] = boxFnArgs(obj[propName], argBoxings);
  }
};

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
      filter,
      ...rest
    } = this.props;

    const instance = unboxDOMNode(this.containerRef.current);
    if (!instance) {
      return;
    }

    const sortableFilter =
      typeof filter === 'function'
        ? boxFnArgs(filter, [boxNativeEvent, boxDOMNode])
        : filter
        ? filter
        : filterClass
        ? `.${filterClass}`
        : '';

    boxFnPropIfExist(rest, 'scrollFn', [null, null, boxNativeEvent]);
    boxFnPropIfExist(rest, 'setData', [null, boxDOMNode]);
    boxFnPropIfExist(rest, 'onStart', [boxSortableEvent]);
    boxFnPropIfExist(rest, 'onAdd', [boxSortableEvent]);
    boxFnPropIfExist(rest, 'onClone', [boxSortableEvent]);
    boxFnPropIfExist(rest, 'onChoose', [boxSortableEvent]);
    boxFnPropIfExist(rest, 'onUnchoose', [boxSortableEvent]);
    boxFnPropIfExist(rest, 'onUpdate', [boxSortableEvent]);
    boxFnPropIfExist(rest, 'onSort', [boxSortableEvent]);
    boxFnPropIfExist(rest, 'onRemove', [boxSortableEvent]);
    boxFnPropIfExist(rest, 'onFilter', [boxSortableEvent]);

    const sortableOptions: sortableJS.Options = {
      filter: sortableFilter,
      ghostClass: `zent-ghost`,
      chosenClass: `zent-chosen`,
      dragClass: `zent-drag`,
      fallbackClass: `zent-fallback`,
      onMove: boxFnArgs(
        (e: sortableJS.MoveEvent) => {
          if (onMove) {
            return onMove(e);
          }
          return filterClass
            ? !e.related.classList.contains(filterClass)
            : true;
        },
        [boxSortableMoveEvent]
      ),
      onEnd: boxFnArgs(
        (e: sortableJS.SortableEvent) => {
          const { items } = this.props;
          onEnd && onEnd(e);

          if (!items) {
            return;
          }

          const { oldIndex, newIndex } = e;
          const newItems = reorder(items, oldIndex, newIndex);

          onChange && onChange(newItems);
        },
        [boxSortableEvent]
      ),

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
