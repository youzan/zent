import * as React from 'react';

import { NumberInput } from '../../../number-input';
import BasePageJumper, {
  IPaginationBaseJumperProps,
  IPaginationBaseJumperState,
} from './BasePageJumper';

const INPUT_WIDTH = 56;

export interface IPaginationMiniPageJumperProps
  extends IPaginationBaseJumperProps {
  totalPages: number;
}

interface IPaginationMiniPageJumperState extends IPaginationBaseJumperState {
  prevProps?: IPaginationMiniPageJumperProps;
}

export class MiniPageJumper extends BasePageJumper<
  IPaginationMiniPageJumperProps,
  IPaginationMiniPageJumperState
> {
  reset: boolean;

  state!: IPaginationMiniPageJumperState;

  constructor(props: IPaginationMiniPageJumperProps) {
    super(props);

    this.reset = false;
    this.state.prevProps = props;
  }

  render() {
    const { value } = this.state;
    const { totalPages } = this.props;

    return (
      <div className="zent-pagination-mini-page-jumper">
        <NumberInput
          value={value}
          onInput={this.onChange}
          onPressEnter={this.onConfirm}
          width={INPUT_WIDTH}
          min={1}
          decimal={0}
        />
        <span className="zent-pagination-mini-page-jumper__sep">/</span>
        <span className="zent-pagination-mini-page-jumper__total">
          {totalPages}
        </span>
      </div>
    );
  }

  static getDerivedStateFromProps(
    props: IPaginationMiniPageJumperProps,
    state: IPaginationMiniPageJumperState
  ) {
    return {
      value: props !== state.prevProps ? props.current : state.value,
      prevProps: props,
    };
  }

  handleJump(pageNumber: number) {
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
