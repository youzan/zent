import * as React from 'react';
import { Component } from 'react';
import cx from 'classnames';

import ConfigContext from './ConfigContext';
import LayoutBreakpointContext from './BreakPointContext';
import { getValueForBreakpoint } from './screen-breakpoints';
import { ILayoutResponsiveValue } from './types';

export interface ILayoutColProps {
  span: number | ILayoutResponsiveValue;
  offset: number | ILayoutResponsiveValue;
  order: number | ILayoutResponsiveValue;
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
              const {
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

              if (colGutter > 0) {
                const width = colGutter / 2;
                colStyles = {
                  ...colStyles,
                  paddingLeft: width,
                  paddingRight: width,
                };
              }

              const spanValue = getValueForBreakpoint(breakpoints, span);
              const offsetValue = getValueForBreakpoint(breakpoints, offset);
              const orderValue = getValueForBreakpoint(breakpoints, order);

              const classes = cx(
                'zent-col',
                {
                  [`zent-col-offset-${offset}`]: offsetValue,
                  [`zent-col-order-${order}`]: orderValue,
                },

                // 0 相当于 display: none
                `zent-col-${spanValue}`,

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
