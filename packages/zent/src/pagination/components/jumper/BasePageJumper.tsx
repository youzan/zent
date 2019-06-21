import { Component } from 'react';

export interface IPaginationBaseJumperProps {
  current?: number;
  onJump: (page: number) => void;
}

export interface IPaginationBaseJumperState {
  value: string;
}

export abstract class BasePageJumper<
  P extends IPaginationBaseJumperProps,
  S extends IPaginationBaseJumperState
> extends Component<P, S> {
  abstract handleJump(pageNumber: number): void;

  constructor(props: P) {
    super(props);

    this.state = {
      value: (props.current || '').toString(),
    } as S;
  }

  onChange = (evt: any) => {
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

export default BasePageJumper;
