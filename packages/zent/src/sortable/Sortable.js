import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import SortableJS from 'sortablejs';

export default class Sortable extends (PureComponent || Component) {
  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    items: PropTypes.array.isRequired,
    options: PropTypes.object,
    onChange: PropTypes.func,
    tag: PropTypes.string
  };

  static defaultProps = {
    prefix: 'zent',
    options: {},
    tag: 'div'
  };

  swapArray = (array, fromIndex, toIndex) => {
    const newArray = [...array];
    const sortValue = newArray[fromIndex];
    newArray[fromIndex] = newArray[toIndex];
    newArray[toIndex] = sortValue;

    return newArray;
  };

  initSortable = instance => {
    const { prefix, options, onChange } = this.props;

    if (!instance) {
      return;
    }

    const sortableOptions = {
      ghostClass: `${prefix}-ghost`,
      chosenClass: `${prefix}-chosen`,
      dragClass: `${prefix}-drag`,
      fallbackClass: `${prefix}-fallback`,
      onEnd: e => {
        const { items } = this.props;
        const { oldIndex, newIndex } = e;
        const newItems = this.swapArray(items, oldIndex, newIndex);
        onChange && onChange(newItems);
      },
      ...options
    };

    SortableJS.create(instance, sortableOptions);
  };

  render() {
    const {
      prefix,
      className,
      children,
      tag: Com,
      options,
      onChange,
      items,
      ...props
    } = this.props;
    const classString = cx(`${prefix}-sortable`, className);

    return (
      <Com
        ref={instance => this.initSortable(instance)}
        className={classString}
        {...props}
      >
        {children}
      </Com>
    );
  }
}
