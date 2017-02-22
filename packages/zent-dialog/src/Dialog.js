import React, { PropTypes, Component } from 'react';
import Portal, { withNonScrollable, withESCToClose } from 'zent-portal';

import DialogEl from './DialogEl';

const DialogPortal = withNonScrollable(Portal);
const DialogPortalESCToClose = withESCToClose(DialogPortal);

export default class Dialog extends Component {
  static propTypes = {
    prefix: PropTypes.string,
    onClose: PropTypes.func,
    visible: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    title: PropTypes.node,
    closeBtn: PropTypes.bool,
    mask: PropTypes.bool,
    maskClosable: PropTypes.bool,
    footer: PropTypes.node
  }

  static defaultProps = {
    prefix: 'zent',
    onClose() {},
    visible: false,
    className: '',
    style: {},
    title: '',
    closeBtn: true,
    mask: true,
    maskClosable: true,
    footer: null
  }

  onClose = (e) => {
    this.props.onClose(e);
  };

  render() {
    const { visible, prefix, closeBtn, style } = this.props;

    // load default max/min-width value when width is not specified in style prop
    const elStyle = {
      ...style.width ? {} : { minWidth: '450px', maxWidth: '75%' },
      ...style
    };

    // 有关闭按钮的时候同时具有ESC关闭的行为
    const PortalComponent = closeBtn ? DialogPortalESCToClose : DialogPortal;

    return (
      <PortalComponent visible={visible} onClose={this.onClose} className={`${prefix}-dialog-r-anchor`}>
        <DialogEl {...this.props} onClose={this.onClose} style={elStyle}>
          {this.props.children}
        </DialogEl>
      </PortalComponent>
    );
  }
}
