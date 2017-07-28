import isPlainObject from 'lodash/isPlainObject';
import assign from 'lodash/assign';

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

export function getValue(event) {
  // 简单判断是否是一个原生事件对象
  if (isEvent(event)) {
    const { target: { type, value, checked, files }, dataTransfer } = event;
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
