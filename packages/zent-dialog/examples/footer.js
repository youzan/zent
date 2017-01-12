import React from 'react';
import Dialog from '../src';
import '../assets/index.scss';

/* 包含footer */
export default class Demo extends React.Component {
  state = {
    visible: false
  }

  showDialog = () => {
    this.setState({
      visible: true
    });
  };

  onCancel = () => {
    this.setState({
      visible: false,
    });
  };

  onOk = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    let dialog = (
      <Dialog
        visible={this.state.visible}
        onClose={this.onCancel}
        title={<span>这是<span style={{ color: '#f76' }}>一个</span><b>标题</b></span>}
        closeBtn={false}
        footer={[
          <button
            className="zent-btn zent-btn-primary"
            key="ok"
            onClick={this.onOk}
          >
            确定
          </button>,
          <button
            className="zent-btn"
            key="close"
            onClick={this.onCancel}
          >
            取消
          </button>
        ]}
      >
        <h4>Text in a modal</h4>
      </Dialog>
    );
    return (
      <div>
        <hr />
        <button
          className="zent-btn zent-btn-primary"
          onClick={this.showDialog}
        >
          显示
        </button>
          {dialog}
      </div>
    );
  }
}
