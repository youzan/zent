import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';

import ConfigContext from './ConfigContext';
import BreakpointContext from './BreakpointContext';
import { getValueForBreakpoint } from './screen-breakpoints';

export interface IRowProps {
  className?: string;
  justify?:
    | 'start'
    | 'center'
    | 'end'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
  align?: 'start' | 'center' | 'end';
  style?: React.CSSProperties;
}

export default class Row extends Component<IRowProps> {
  static propTypes = {
    justify: PropTypes.oneOf([
      'start',
      'end',
      'center',
      'space-around',
      'space-between',
      'space-evenly',
    ]),
    align: PropTypes.oneOf(['start', 'center', 'end']),
    className: PropTypes.string,
  };

  static defaultProps = {
    justify: 'start',
    align: 'start',
  };

  render() {
    const { className, style, justify, align, ...others } = this.props;

    const classes = cx(
      {
        'zent-row': true,
      },
      `zent-row-justify-${justify}`,
      `zent-row-align-${align}`,
      className
    );

    return (
      <BreakpointContext.Consumer>
        {breakpoints => (
          <ConfigContext.Consumer>
            {config => {
              const colGutter = getValueForBreakpoint(
                breakpoints,
                config.colGutter
              );
              const rowGutter = getValueForBreakpoint(
                breakpoints,
                config.rowGutter
              );
              let rowStyles = style;

              if (colGutter && colGutter > 0) {
                const width = -(colGutter / 2);
                rowStyles = {
                  ...rowStyles,
                  marginLeft: width,
                  marginRight: width,
                };
              }

              if (rowGutter && rowGutter > 0) {
                const height = rowGutter / 2;
                rowStyles = {
                  ...rowStyles,
                  paddingTop: height,
                  paddingBottom: height,
                };
              }

              return (
                <div {...others} className={classes} style={rowStyles}>
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
