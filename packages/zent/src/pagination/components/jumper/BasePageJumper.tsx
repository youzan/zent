import { Component, PropsWithChildren } from 'react';

export interface IPaginationBaseJumperProps {
  current?: number;
  onJump: (page: number) => void;
}

export interface IPaginationBaseJumperState {
  value: number | null;
}

export abstract class BasePageJumper<
  P extends IPaginationBaseJumperProps,
  S extends IPaginationBaseJumperState
> extends Component<PropsWithChildren<P>, S> {
  abstract handleJump(pageNumber: number): void;

  constructor(props: P) {
    super(props);

    this.state = {
      value: props.current ?? null,
    } as S;
  }

  onChange = (value: number | null) => {
    this.setState({
      value,
    });
  };

  onConfirm: React.KeyboardEventHandler<HTMLInputElement> = e => {
    e.preventDefault();

    // We can't use this.state.value here, because onChanges fires on blur for normalized value
    // e.g. If we enter 0, the value will be normalized to 1 in NumberInput, but onChange will only fire on blur.
    const pageNumber = +(e.target as HTMLInputElement).value;
    this.handleJump(pageNumber);
  };
}

export default BasePageJumper;
