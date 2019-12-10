import { QueryHandler } from './QueryHandler';
import { IEnquireOptions } from './types';

/**
 * Represents a single media query, manages it's state and registered handlers for this query
 */
export class MediaQuery {
  query: string;
  isUnconditional: boolean;
  handlers: QueryHandler[];
  mql: MediaQueryList;
  listener: (m: any) => void;

  constructor(query: string, isUnconditional = false) {
    this.query = query;
    this.isUnconditional = isUnconditional;
    this.handlers = [];
    this.mql = window.matchMedia(query);

    this.listener = mql => {
      // Chrome passes an MediaQueryListEvent object, while other browsers pass MediaQueryList directly
      this.mql = mql.currentTarget || mql;
      this.assess();
    };
    // tslint:disable-next-line: deprecation
    this.mql.addListener(this.listener);
  }

  /**
   * add a handler for this query, triggering if already active
   */
  addHandler(handler: IEnquireOptions) {
    const qh = new QueryHandler(handler);
    this.handlers.push(qh);

    this.matches() && qh.on();
  }

  /**
   * removes the given handler from the collection, and calls it's destroy methods
   */
  removeHandler(handler: IEnquireOptions | (() => void)) {
    const { handlers } = this;
    for (let i = 0; i < handlers.length; i++) {
      const h = handlers[i];
      if (h.equals(handler)) {
        h.destroy();
        handlers.splice(i, 1); //remove from array and exit each early
        break;
      }
    }
  }

  /**
   * Determine whether the media query should be considered a match
   */
  matches() {
    return this.mql.matches || this.isUnconditional;
  }

  /**
   * Clears all handlers and unbinds events
   */
  clear() {
    this.handlers.forEach(h => {
      h.destroy();
    });
    // tslint:disable-next-line: deprecation
    this.mql.removeListener(this.listener);
    this.handlers.length = 0; //clear array
  }

  /*
   * Assesses the query, turning on all handlers if it matches, turning them off if it doesn't match
   */
  assess() {
    const match = this.matches();
    this.handlers.forEach(handler => {
      match ? handler.on() : handler.off();
    });
  }
}
