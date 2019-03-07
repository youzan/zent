import * as React from 'react';
import { Component } from 'react';
import cx from 'classnames';

import ConfigContext from './ConfigContext';
import LayoutBreakpointContext from './BreakpointContext';
import { getValueForBreakpoint } from './screen-breakpoints';

export interface ILayoutResponsiveValue {
  // Fallback value when no breakpoint is matched
  fallback: number;

  // Breakpoints from bootstrap 4
  xs?: number; // width <576px
  sm?: number; // width ≥576px
  md?: number; // width ≥768px
  lg?: number; // width ≥992px
  xl?: number; // width ≥1200px

  // These breakpoints are not in bootstrap
  xxl?: number; // width ≥1600px;
  fhd?: number; // width ≥1920px;
}

export interface ILayoutColProps {
  span: number | ILayoutResponsiveValue;
  offset?: number | ILayoutResponsiveValue;
  order?: number | ILayoutResponsiveValue;
  style?: React.CSSProperties;
  className?: string;
}

export class LayoutCol extends Component<ILayoutColProps> {
  static defaultProps = {
    offset: 0,
    order: 0,
  };

  render() {
    return (
      <LayoutBreakpointContext.Consumer>
        {breakpoints => (
          <ConfigContext.Consumer>
            {config => {
              let {
                span,
                offset,
                order,
                className,
                style,
                ...others
              } = this.props;

              let colStyles = style;
              const colGutter = getValueForBreakpoint(
                breakpoints,
                config.colGutter
              );

              if (colGutter && colGutter > 0) {
                const width = colGutter / 2;
                colStyles = {
                  ...colStyles,
                  paddingLeft: width,
                  paddingRight: width,
                };
              }

              span = getValueForBreakpoint(breakpoints, span);
              offset = getValueForBreakpoint(breakpoints, offset);
              order = getValueForBreakpoint(breakpoints, order);

              const classes = cx(
                'zent-col',
                {
                  [`zent-col-offset-${offset}`]: offset,
                  [`zent-col-order-${order}`]: order,
                },

                // 0 相当于 display: none
                `zent-col-${span}`,

                className
              );

              return (
                <div {...others} className={classes} style={colStyles}>
                  {this.props.children}
                </div>
              );
            }}
          </ConfigContext.Consumer>
        )}
      </LayoutBreakpointContext.Consumer>
    );
  }
}

export default LayoutCol;
