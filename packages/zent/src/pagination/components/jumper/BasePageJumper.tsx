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

  onChange = (value: string) => {
    this.setState({
      value,
    });
  };

  onConfirm: React.KeyboardEventHandler<HTMLInputElement> = e => {
    e.preventDefault();

    // We can't use this.state.value here, because onChanges fires on blur for normalized value
    // e.g. If we enter 0, the value will be normalized to 1 in NumberInput, but onChange will only fire on blur.
    const pageNumber = +(e.target as HTMLInputElement).value;

    if (pageNumber) {
      this.handleJump(pageNumber);
    }
  };
}

export default BasePageJumper;
