/**
 * A lazy map with default value.
 *
 * If most of the entries in your map defaults to the same value, you can use LazyMap to save memory.
 */
import has from 'lodash/has';

export default class LazyMap {
  constructor(defaultValue, map = {}) {
    this.defaultValue = defaultValue;
    this.map = map;
  }

  get(key) {
    if (has(this.map, key)) {
      return this.map[key];
    }

    return this.defaultValue;
  }

  set(key, value) {
    this.map[key] = value;
    return this;
  }

  clone() {
    return new LazyMap(this.defaultValue, this.map);
  }

  has(key) {
    return has(this.map, key);
  }

  /* Use this iff value is a number */
  inc(key) {
    const oldValue = this.get(key);
    this.set(key, oldValue + 1);
    return this;
  }

  /* Use this iff value is a number */
  dec(key) {
    const oldValue = this.get(key);
    this.set(key, oldValue - 1);
    return this;
  }
}
