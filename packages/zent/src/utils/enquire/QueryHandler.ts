import { IEnquireOptions } from './types';

/**
 * Delegate to handle a media query being matched and unmatched.
 */
export class QueryHandler {
  initialized: boolean;
  options: IEnquireOptions;

  constructor(options: IEnquireOptions) {
    this.options = options;
    !options.deferSetup && this.setup();
  }

  /**
   * coordinates setup of the handler
   */
  setup() {
    this.options.setup?.();
    this.initialized = true;
  }

  /**
   * coordinates setup and triggering of the handler
   */
  on() {
    !this.initialized && this.setup();
    this.options.match?.();
  }

  /**
   * coordinates the unmatch event for the handler
   */
  off() {
    this.options.unmatch?.();
  }

  /**
   * called when a handler is to be destroyed.
   * delegates to the destroy or unmatch callbacks, depending on availability.
   */
  destroy() {
    this.options.destroy ? this.options.destroy() : this.off();
  }

  /**
   * determines equality by reference.
   * if object is supplied compare options, if function, compare match callback
   */
  equals(target: IEnquireOptions | (() => void)) {
    return this.options === target || this.options.match === target;
  }
}
