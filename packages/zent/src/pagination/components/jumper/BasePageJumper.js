import { Component } from 'react';

export default class BasePageJumper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.current || '',
    };
  }

  onChange = evt => {
    this.setState({
      value: evt.target.value,
    });
  };

  onConfirm = () => {
    const pageNumber = parseInt(this.state.value, 10);

    if (pageNumber) {
      this.handleJump(pageNumber);
    }
  };
}
