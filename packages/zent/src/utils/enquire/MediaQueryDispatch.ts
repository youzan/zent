import { MediaQuery } from './MediaQuery';
import { IEnquireOptions } from './types';

/**
 * Allows for registration of query handlers.
 * Manages the query handler's state and is responsible for wiring up browser events
 */
export class MediaQueryDispatch {
  browserIsIncapable: boolean;
  queries: Record<string, MediaQuery>;

  constructor() {
    if (!window.matchMedia) {
      throw new Error(
        'matchMedia not present, legacy browsers require a polyfill'
      );
    }

    this.queries = {};
    this.browserIsIncapable = !window.matchMedia('only all').matches;
  }

  /**
   * Registers a handler for the given media query
   */
  register(
    q: string,
    options: IEnquireOptions | IEnquireOptions[] | (() => void),
    shouldDegrade = false
  ) {
    const queries = this.queries;
    const isUnconditional = shouldDegrade && this.browserIsIncapable;

    if (!queries[q]) {
      queries[q] = new MediaQuery(q, isUnconditional);
    }

    // normalize to object in an array
    if (typeof options === 'function') {
      options = { match: options };
    }
    if (!Array.isArray(options)) {
      options = [options];
    }

    const query = queries[q];
    options.forEach(handler => {
      if (typeof handler === 'function') {
        handler = { match: handler };
      }
      query.addHandler(handler);
    });

    return this;
  }

  /**
   * unregister a query and all its handlers, or a specific handler for a query
   */
  unregister(q: string, handler?: IEnquireOptions | (() => void)) {
    const query = this.queries[q];

    if (query) {
      if (handler) {
        query.removeHandler(handler);
      } else {
        query.clear();
        delete this.queries[q];
      }
    }

    return this;
  }
}
