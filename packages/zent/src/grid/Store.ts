import { hasOwnProperty } from '../utils/hasOwn';

export default class Store {
  state: {
    [propsName: string]: any;
  } = {};
  listeners: {
    [eventName: string]: Array<() => void>;
  } = {};

  setState = (nextState: any) => {
    this.state = { ...this.state, ...nextState };
    Object.keys(nextState).forEach(stateName => {
      (this.listeners[stateName] ?? []).forEach(listener => {
        listener();
      });
    });
  };

  getState(propsName?: string, callBack?: () => void): any {
    if (propsName) {
      if (callBack && !hasOwnProperty(this.state, propsName)) {
        this.setState({
          [propsName]: callBack(),
        });
        return this.getState(propsName);
      }
      return this.state[propsName];
    }
    return this.state;
  }

  trigger = (eventName: string) => {
    (this.listeners[eventName] ?? []).forEach(listener => {
      listener();
    });
  };

  subscribe = (eventName: string, listener: () => void) => {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(listener);

    return () => {
      const listeners = this.listeners[eventName] ?? [];
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        this.listeners[eventName].splice(index, 1);
      }
    };
  };
}
