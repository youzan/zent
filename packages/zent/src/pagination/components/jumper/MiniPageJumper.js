import React from 'react';
import Input from 'input';
import PropTypes from 'prop-types';

import BasePageJumper from './BasePageJumper';

const INPUT_WIDTH = 56;

export default class MiniPageJumper extends BasePageJumper {
  static propTypes = {
    current: PropTypes.number,
    totalPages: PropTypes.number,
    onJump: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.reset = false;
  }

  render() {
    const { value } = this.state;
    const { totalPages } = this.props;

    return (
      <div className="zent-pagination-mini-page-jumper">
        <Input
          value={value}
          onChange={this.onChange}
          onPressEnter={this.onConfirm}
          width={INPUT_WIDTH}
        />
        <span className="zent-pagination-mini-page-jumper__sep">/</span>
        <span>{totalPages}</span>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    const { current } = nextProps;

    this.setState({
      value: current,
    });
  }

  handleJump(pageNumber) {
    const { onJump, totalPages } = this.props;

    onJump(pageNumber);

    if (pageNumber > totalPages) {
      this.setState({
        value: totalPages.toString(),
      });
    }

    if (pageNumber < 1) {
      this.setState({
        value: '1',
      });
    }
  }
}
