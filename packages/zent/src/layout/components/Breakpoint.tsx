import { Component } from 'react';
import * as PropTypes from 'prop-types';
import * as enquire from 'enquire.js';

import isBrowser from '../../utils/isBrowser';

/**
 * enquire can attatch multiple callbacks to the same media query.
 *
 * Breakpoints with same media query string are merged into a single query
 * with multiple callbacks attatched when using multiple instances of Breakpoint.
 *
 * So no need for one more media query manager.
 */
export default class Breakpoint extends Component<any> {
  static propTypes = {
    breakpoints: PropTypes.array,
    onChange: PropTypes.func,
  };

  render() {
    return null;
  }

  componentDidMount() {
    this.registerBreakpoints(this.props);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.breakpoints !== this.props.breakpoints ||
      prevProps.onChange !== this.props.onChange
    ) {
      this.unregisterBreakpoints(prevProps);
      this.registerBreakpoints(this.props);
    }
  }

  registerBreakpoints(props) {
    if (!isBrowser || !window.matchMedia) {
      return;
    }

    const { breakpoints, onChange } = props;

    breakpoints.forEach(brk => {
      enquire.register(brk, {
        match() {
          onChange({ [brk]: true });
        },

        unmatch() {
          onChange({ [brk]: false });
        },
      });
    });
  }

  unregisterBreakpoints(props) {
    if (!isBrowser || !window.matchMedia) {
      return;
    }

    const { breakpoints } = props;

    breakpoints.forEach(brk => {
      enquire.unregister(brk);
    });
  }
}
