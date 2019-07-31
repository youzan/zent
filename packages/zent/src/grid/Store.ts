import assign from 'lodash-es/assign';
import get from 'lodash-es/get';
import has from 'lodash-es/has';
import indexOf from 'lodash-es/indexOf';
import keys from 'lodash-es/keys';
import forEach from 'lodash-es/forEach';

export default class Store {
  state: {
    [propsName: string]: any;
  } = {};
  listeners: {
    [eventName: string]: Array<() => void>;
  } = {};

  setState = (nextState: any) => {
    this.state = assign({}, this.state, nextState);
    forEach(keys(nextState), stateName => {
      forEach(get(this.listeners, stateName), listener => {
        listener();
      });
    });
  };

  getState(propsName?: string, callBack?: () => void): any {
    if (propsName) {
      const props = get(this.state, propsName);
      if (callBack && !has(this.state, propsName)) {
        this.setState({
          [propsName]: callBack(),
        });
        return this.getState(propsName);
      }
      return props;
    }
    return this.state;
  }

  trigger = (eventName: string) => {
    forEach(get(this.listeners, eventName), listener => {
      listener();
    });
  };

  subscribe = (eventName: string, listener: () => void) => {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(listener);

    return () => {
      const listeners = get(this.listeners, eventName);
      const index = indexOf(listeners, listener);

      if (Array.isArray(listeners)) {
        this.listeners[eventName].splice(index, 1);
      }
    };
  };
}
