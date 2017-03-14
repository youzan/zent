import React, { PropTypes } from 'react';
import cx from 'zent-utils/classnames';
import { getKeyFromChildrenIndex } from './utils';
import CommonMenu from './CommonMenu';

const noop = () => {};

class Menu extends CommonMenu {
  static propTypes = {
    prefix: PropTypes.string,
    wrapperClassName: PropTypes.string,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    prefix: 'zent',
    onClick: noop
  };

  onClick = (e, index) => {
    const { onClick } = this.props;

    onClick(index, e);
  }

  renderMenuItem = (c, i, index) => {
    if (!c) {
      return null;
    }
    return this.renderCommonMenuItem(c, i, index);
  };

  render() {
    const {
      children,
      prefix,
      wrapperClassName
    } = this.props;

    return (
      <ul className={cx(`${prefix}-menu-wrapper`, wrapperClassName)}>
        {React.Children.map(children, this.renderMenuItem)}
      </ul>
    );
  }
}

export default Menu;
