import React, { Component, PropTypes } from 'react';
import classNames from 'zent-utils/classnames';

function findIndex(array, predicate) {
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i])) {
      return i;
    }
  }

  return -1;
}

export default class Group extends Component {

  static propTypes = {
    value: PropTypes.array,
    isValueEqual: PropTypes.func,
    onChange: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    prefix: PropTypes.string,
  }

  static defaultProps = {
    value: [],
    prefix: 'zent',
    className: '',
    style: {},
    onChange() {},
    isValueEqual(a, b) {
      return a === b;
    }
  }

  onCheckboxChange = (e) => {
    const changedValue = e.target.value;
    const groupValue = this.props.value.slice();
    const { isValueEqual } = this.props;
    const index = findIndex(groupValue, val => isValueEqual(val, changedValue));

    if (index !== -1) {
      groupValue.splice(index, 1);
    } else {
      groupValue.push(changedValue);
    }

    this.props.onChange(groupValue);
  }

  render() {
    const { className, prefix, style, isValueEqual, value } = this.props;
    const children = React.Children.map(this.props.children, (checkbox) => {
      if (checkbox && checkbox.props) {
        return React.cloneElement(checkbox, {
          ...checkbox.props,
          onChange: this.onCheckboxChange,
          checked: findIndex(value, val => isValueEqual(val, checkbox.props.value)) !== -1,
          disabled: checkbox.props.disabled !== void 0 ? checkbox.props.disabled : this.props.disabled,
          readOnly: checkbox.props.readOnly !== void 0 ? checkbox.props.readOnly : this.props.readOnly
        });
      }
    });

    const classString = classNames({
      [`${prefix}-checkbox-group`]: true,
      [className]: !!className
    });

    return <div className={classString} style={style}>{children}</div>;
  }
}
