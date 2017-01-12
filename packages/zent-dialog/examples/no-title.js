import React from 'react';
import Dialog from '../src';
import '../assets/index.scss';

/* 没有title和footer */
export default class Demo extends React.Component {
  state = {
    visible: false,
    closeBtn: true
  }

  showDialog = () => {
    this.setState({
      visible: true,
      closeBtn: true
    });
  };

  showDialogNoCloseBtn = () => {
    this.setState({
      visible: true,
      closeBtn: false
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    let dialog;
    if (this.state.visible) {
      dialog = (
        <Dialog
          visible={this.state.visible}
          closeBtn={this.state.closeBtn}
          onClose={this.onClose}
        >
          <div>
            <div>没有标题，样式会有细微变化</div>
          </div>
        </Dialog>);
    }

    return (
      <div>
        <hr />
        <button
          className="zent-btn zent-btn-primary"
          onClick={this.showDialog}
        >
          有关闭按钮
        </button>
        <button className="zent-btn zent-btn-primary" onClick={this.showDialogNoCloseBtn}>没有关闭按钮</button>
        {dialog}
      </div>
    );
  }
}
