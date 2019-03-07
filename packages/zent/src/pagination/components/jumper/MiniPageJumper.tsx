import * as React from 'react';

import Input from '../../../input';
import BasePageJumper, { IPaginationBaseJumperProps } from './BasePageJumper';

const INPUT_WIDTH = 56;

export interface IPaginationMiniPageJumper extends IPaginationBaseJumperProps {
  totalPages?: number;
}

export class MiniPageJumper extends BasePageJumper<IPaginationMiniPageJumper> {
  reset: boolean;

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

export default MiniPageJumper;
