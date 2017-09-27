import has from 'lodash/has';

export default class InstanceCountMap {
  constructor(defaultValue) {
    this.defaultValue = defaultValue;
    this.map = {};
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

  has(key) {
    return has(this.map, key);
  }

  inc(key) {
    const oldValue = this.get(key);
    this.set(key, oldValue + 1);
    return this;
  }

  dec(key) {
    const oldValue = this.get(key);
    this.set(key, oldValue - 1);
    return this;
  }
}
