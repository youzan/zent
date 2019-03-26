import { Component } from 'react';

export interface IPaginationBaseJumperProps {
  current?: number;
  onJump?: (page: number) => void;
}

export abstract class BasePageJumper<
  P extends IPaginationBaseJumperProps
> extends Component<P, any> {
  abstract handleJump(pageNumber: number): void;

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

export default BasePageJumper;
