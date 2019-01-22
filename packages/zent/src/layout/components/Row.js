import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import ConfigContext from './ConfigContext';

export default class Row extends PureComponent {
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
      <ConfigContext.Consumer>
        {config => {
          const { colGutter, rowGutter } = config;
          let rowStyles = style;

          if (colGutter > 0) {
            const width = -(colGutter / 2);
            rowStyles = {
              ...rowStyles,
              marginLeft: width,
              marginRight: width,
            };
          }

          if (rowGutter > 0) {
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
    );
  }
}
