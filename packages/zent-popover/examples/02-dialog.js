import React, { Component } from 'react';
import Dialog from 'zent-dialog';
import Button from 'zent-button';

import Popover from '../src';

import 'zent-button/lib/index.css';
import 'zent-dialog/lib/index.css';
import '../assets/index.scss';
import '../assets/01-simple.scss';

/*
 Popover在其他弹层中时位置是对的。
 */
export default class DialogDemo extends Component {
  state = {
    value: '',
    dialogVisible: false
  };

  closeDialog = () => {
    this.setState({
      dialogVisible: false
    });
  };

  openDialog = () => {
    this.setState({
      dialogVisible: true
    });
  };

  onInputChange = (evt) => {
    this.setState({
      value: evt.target.value
    });
  }

  render() {
    return (
      <div>
        <Button onClick={this.openDialog}>open dialog</Button>
        <Dialog visible={this.state.dialogVisible} title="dialog" onClose={this.closeDialog}>
          <div>
            <p>dialog content</p>

            <Popover position={Popover.Position.TopCenter}>
              <Popover.Trigger.Click>
                <Button>click me</Button>
              </Popover.Trigger.Click>
              <Popover.Content>
                <div>popover content</div>
                <input value={this.state.value} onChange={this.onInputChange} placeholder="type here..." />
              </Popover.Content>
            </Popover>
          </div>
        </Dialog>
      </div>
    );
  }
}
