import React from 'react';
import Dialog from '../src';
import '../assets/index.scss';

/* 基本例子，不包含footer，每次关闭会删除DOM */
export default class Demo extends React.Component {
  state = {
    visible: false,
    text: ''
  }

  showDialog = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onTextChange = ({ target: { value } }) => {
    this.setState({
      text: value
    });
  };

  render() {
    let dialog;
    if (this.state.visible) {
      dialog = (
        <Dialog
          visible={this.state.visible}
          onClose={this.onClose}
          title="这是一个标题"
        >
          <div>
            <div>Text in a modal</div>
            <input onChange={this.onTextChange} value={this.state.text} />
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
          显示
        </button>
        {dialog}
      </div>
    );
  }
}
