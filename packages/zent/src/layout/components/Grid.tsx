import * as React from 'react';
import { Component } from 'react';
import cx from 'classnames';
import pickBy from 'lodash-es/pickBy';

import ConfigContext from './ConfigContext';
import BreakPointHub from './BreakPointHub';
import LayoutBreakpointContext from './BreakPointContext';
import { BREAKPOINTS, getValueForBreakpoint } from './screen-breakpoints';
import { LayoutBreakPoint } from './types';

export interface ILayoutGridProps {
  className?: string;
  style?: React.CSSProperties;
}

interface ILayoutGridState {
  breakpoints: Partial<Record<LayoutBreakPoint, boolean>>;
}

export class LayoutGrid extends Component<ILayoutGridProps, ILayoutGridState> {
  state = {
    breakpoints: {} as Partial<Record<LayoutBreakPoint, boolean>>,
  };

  render() {
    const { className, style, ...others } = this.props;
    const { breakpoints } = this.state;

    return (
      <ConfigContext.Consumer>
        {config => {
          const rowGutter = getValueForBreakpoint(
            breakpoints,
            config.rowGutter
          );
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
              <LayoutBreakpointContext.Provider value={breakpoints}>
                {this.props.children}
              </LayoutBreakpointContext.Provider>
              <BreakPointHub
                breakpoints={BREAKPOINTS}
                onChange={this.onBreakpointChange}
              />
            </div>
          );
        }}
      </ConfigContext.Consumer>
    );
  }

  onBreakpointChange = (name: LayoutBreakPoint, matched: boolean) => {
    this.setState(prevState => {
      const { breakpoints } = prevState;

      return {
        breakpoints: pickBy({ ...breakpoints, [name]: matched }),
      } as ILayoutGridState;
    });
  };
}

export default LayoutGrid;
