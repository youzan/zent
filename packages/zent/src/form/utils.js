import isPlainObject from 'lodash/isPlainObject';
import assign from 'lodash/assign';
import scroll from 'utils/scroll';
import get from 'lodash/get';
import has from 'lodash/has';
import isFunction from 'lodash/isFunction';
import { findDOMNode } from 'react-dom';
import { FieldArrayMutatorAction } from './constants';

const getSelectedValues = options => {
  const result = [];
  if (options) {
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      if (option.selected) {
        result.push(option.value);
      }
    }
  }
  return result;
};

const isEvent = candidate =>
  !!(candidate && candidate.stopPropagation && candidate.preventDefault);

export function getValue(event, realValue) {
  if (arguments.length >= 2) {
    return realValue;
  }

  // 简单判断是否是一个原生事件对象
  if (isEvent(event)) {
    const {
      target: { type, value, checked, files },
      dataTransfer,
    } = event;
    if (type === 'checkbox') {
      return checked;
    }
    if (type === 'file') {
      return files || (dataTransfer && dataTransfer.files);
    }
    if (type === 'select-multiple') {
      return getSelectedValues(event.target.options);
    }
    if (value !== '' && (type === 'number' || type === 'range')) {
      return parseFloat(value);
    }
    return value;
  }

  // 自定义组件需要直接抛出value或者把value放在一个对象中
  return event && event.value !== undefined ? event.value : event;
}

// 根据旧值和变化值，得到当前值
export function getCurrentValue(changedValue, prevValue) {
  let currentValue;
  if (prevValue && isPlainObject(prevValue)) {
    currentValue = assign({}, prevValue, changedValue);
  } else {
    currentValue = changedValue;
  }
  return currentValue;
}

export function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

export function silenceEvent(event) {
  const is = isEvent(event);
  if (is) {
    event.preventDefault();
  }
  return is;
}

export function silenceEvents(fn) {
  return (event, ...args) => {
    silenceEvent(event) ? fn(...args) : fn(event, ...args);
  };
}

export function prefixName(zentForm, name) {
  const { prefix } = zentForm;
  let newName;
  if (!prefix) {
    newName = name;
  } else if (/^\[\d+\]/.test(name)) {
    newName = `${prefix}${name}`;
  } else {
    newName = `${prefix}.${name}`;
  }
  return newName;
}

export function isFunctional(Component) {
  return (
    typeof Component !== 'string' &&
    typeof Component.prototype.render !== 'function'
  );
}

export function scrollToNode(node) {
  const element = findDOMNode(node);

  // Skip if element is not a DOM node or text node
  if (!element || !isFunction(element.getBoundingClientRect)) {
    return;
  }

  const elementBound = element.getBoundingClientRect();
  const y = elementBound.top + window.pageYOffset;
  const x = elementBound.left + window.pageXOffset;
  scroll(document.body, x, y);
}

export function scrollToFirstError(fields) {
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    if (!field.isValid()) {
      const fieldComponent = field.getWrappedComponent();
      let node;

      if (fieldComponent && isFunction(fieldComponent.getControlInstance)) {
        node = fieldComponent.getControlInstance();
      } else {
        node = fieldComponent;
      }

      if (node) {
        scrollToNode(node);
        return true;
      }
    }
  }

  return false;
}

export function updateFieldArray(fieldArrays, data, options) {
  const shouldRemove = get(options, 'removeIfNotExists', false);

  fieldArrays.forEach(fc => {
    const name = fc.getName();
    const value = get(data, name);
    if (value !== undefined) {
      fc.replaceAllFields(value);
    } else if (shouldRemove) {
      fc.removeAllFields();
    }

    fc.setMutatorAction(
      get(options, 'mutatorAction', FieldArrayMutatorAction.Set)
    );
  });
}

export function isFieldArrayValue(value) {
  return has(value, '_fieldInternalValue') && has(value, '_fieldInternalKey');
}

export function unliftFieldArrayValue(value) {
  while (isFieldArrayValue(value)) {
    value = get(value, '_fieldInternalValue');
  }

  return value;
}
