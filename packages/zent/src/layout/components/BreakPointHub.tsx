import { Component } from 'react';
const enquire = require('enquire.js');

import isBrowser from '../../utils/isBrowser';
import { LayoutBreakPoint } from './types';

interface IBreakPointHubProps {
  breakpoints: LayoutBreakPoint[];
  onChange: (brk: LayoutBreakPoint, matched: boolean) => void;
}

/**
 * enquire can attatch multiple callbacks to the same media query.
 *
 * Breakpoints with same media query string are merged into a single query
 * with multiple callbacks attatched when using multiple instances of Breakpoint.
 *
 * So no need for one more media query manager.
 */
export class BreakPointHub extends Component<IBreakPointHubProps> {
  render() {
    return null;
  }

  componentDidMount() {
    this.registerBreakpoints(this.props);
  }

  componentDidUpdate(prevProps: IBreakPointHubProps) {
    if (
      prevProps.breakpoints !== this.props.breakpoints ||
      prevProps.onChange !== this.props.onChange
    ) {
      this.unregisterBreakpoints(prevProps);
      this.registerBreakpoints(this.props);
    }
  }

  registerBreakpoints(props: IBreakPointHubProps) {
    if (!isBrowser || !window.matchMedia) {
      return;
    }

    const { breakpoints, onChange } = props;

    breakpoints.forEach(brk => {
      enquire.register(brk, {
        match() {
          onChange(brk, true);
        },

        unmatch() {
          onChange(brk, false);
        },
      });
    });
  }

  unregisterBreakpoints(props: IBreakPointHubProps) {
    if (!isBrowser || !window.matchMedia) {
      return;
    }

    const { breakpoints } = props;

    breakpoints.forEach(brk => {
      enquire.unregister(brk);
    });
  }
}

export default BreakPointHub;
