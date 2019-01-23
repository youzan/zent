import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import omitBy from 'lodash/omitBy';

import ConfigContext from './ConfigContext';
import Breakpoint from './Breakpoint';
import BreakpointContext from './BreakpointContext';
import { BREAKPOINTS } from './screen-breakpoints';

export default class Grid extends Component {
  static propTypes = {
    className: PropTypes.string,
  };

  state = {
    breakpoints: [],
  };

  render() {
    const { className, style, ...others } = this.props;

    return (
      <ConfigContext.Consumer>
        {config => {
          const { rowGutter } = config;
          let layoutStyles = style;

          if (rowGutter > 0) {
            const height = -(rowGutter / 2);
            layoutStyles = {
              ...layoutStyles,
              marginTop: height,
              marginBottom: height,
            };
          }

          return (
            <div
              {...others}
              className={cx('zent-layout-grid', className)}
              style={layoutStyles}
            >
              <BreakpointContext.Provider value={this.state.breakpoints}>
                {this.props.children}
              </BreakpointContext.Provider>
              <Breakpoint
                breakpoints={BREAKPOINTS}
                onChange={this.onBreakpointChange}
              />
            </div>
          );
        }}
      </ConfigContext.Consumer>
    );
  }

  onBreakpointChange = delta => {
    this.setState(prevState => {
      const { breakpoints } = prevState;

      return {
        breakpoints: omitBy(
          { ...breakpoints, ...delta },
          (matched, brk) => !matched || delta[brk] === false
        ),
      };
    });
  };
}
