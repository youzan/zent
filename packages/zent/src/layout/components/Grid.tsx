import * as React from 'react';
import { Component } from 'react';
import cx from 'classnames';
import omitBy from 'lodash-es/omitBy';

import ConfigContext from './ConfigContext';
import Breakpoint from './Breakpoint';
import LayoutBreakpointContext from './BreakpointContext';
import { BREAKPOINTS } from './screen-breakpoints';

export interface ILayoutGridProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface ILayoutGridState {
  breakpoints: string[];
}

export class LayoutGrid extends Component<ILayoutGridProps, ILayoutGridState> {
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
              <LayoutBreakpointContext.Provider value={this.state}>
                {this.props.children}
              </LayoutBreakpointContext.Provider>
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

  onBreakpointChange = (name, matched) => {
    this.setState(prevState => {
      const { breakpoints } = prevState;

      return {
        breakpoints: omitBy(
          { ...breakpoints, [name]: matched },
          matched => !matched || matched === false
        ),
      } as any;
    });
  };
}

export default LayoutGrid;
