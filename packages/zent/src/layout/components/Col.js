import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import ConfigContext from './ConfigContext';

export default class Col extends PureComponent {
  static propTypes = {
    span: PropTypes.number,
    offset: PropTypes.number,
    order: PropTypes.number,
    className: PropTypes.string,
  };

  static defaultProps = {
    offset: 0,
    order: 0,
  };

  render() {
    const { span, offset, order, className, style, ...others } = this.props;

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
      <ConfigContext.Consumer>
        {config => {
          const { colGutter } = config;
          let colStyles = style;

          if (colGutter > 0) {
            const width = colGutter / 2;
            colStyles = {
              ...colStyles,
              paddingLeft: width,
              paddingRight: width,
            };
          }

          return (
            <div {...others} className={classes} style={colStyles}>
              {this.props.children}
            </div>
          );
        }}
      </ConfigContext.Consumer>
    );
  }
}
