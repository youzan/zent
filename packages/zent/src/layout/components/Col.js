import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import ConfigContext from './ConfigContext';
import BreakpointContext from './BreakpointContext';
import { getValueForBreakpoint } from './screen-breakpoints';

export default class Col extends PureComponent {
  static propTypes = {
    span: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
    offset: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    order: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    className: PropTypes.string,
  };

  static defaultProps = {
    offset: 0,
    order: 0,
  };

  render() {
    return (
      <BreakpointContext.Consumer>
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
      </BreakpointContext.Consumer>
    );
  }
}
