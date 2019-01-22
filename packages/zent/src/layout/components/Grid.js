import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import ConfigContext from './ConfigContext';

export default class Layout extends Component {
  static propTypes = {
    className: PropTypes.string,
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
              className={cx('zent-layout', className)}
              style={layoutStyles}
            >
              {this.props.children}
            </div>
          );
        }}
      </ConfigContext.Consumer>
    );
  }
}
