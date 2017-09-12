import assign from 'lodash/assign';
import get from 'lodash/get';
import indexOf from 'lodash/indexOf';
import isArray from 'lodash/isArray';
import keys from 'lodash/keys';
import forEach from 'lodash/forEach';

export default class Store {
  constructor() {
    this.state = {};
    this.listeners = {};
  }

  setState = nextState => {
    this.state = assign({}, this.state, nextState);
    forEach(keys(nextState), stateName => {
      forEach(get(this.listeners, stateName), listener => {
        listener();
      });
    });
  };

  getState = propsName => {
    return propsName ? get(this.state, propsName) : this.state;
  };

  trigger = eventName => {
    forEach(get(this.listeners, eventName), listener => {
      listener();
    });
  };

  subscribe = (eventName, listener) => {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(listener);

    return () => {
      const listeners = get(this.listeners, eventName);
      const index = indexOf(listeners, listener);

      if (isArray(listeners)) {
        this.listeners[eventName].splice(index, 1);
      }
    };
  };
}
