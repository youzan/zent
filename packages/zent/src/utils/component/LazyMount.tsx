import { Component } from 'react';

export interface ILazyMountProps {
  mount?: boolean;
}

export interface ILazyMountState {
  mounted: boolean;
}

export default class LazyMount extends Component<
  ILazyMountProps,
  ILazyMountState
> {
  static defaultProps = {
    mount: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      mounted: props.mount,
    };
  }

  render() {
    const { children } = this.props;
    const { mounted } = this.state;

    return mounted ? children : null;
  }

  componentWillReceiveProps(nextProps) {
    const { mount } = nextProps;
    const { mounted } = this.state;
    if (mount && !mounted) {
      this.setState({
        mounted: true,
      });
    }
  }
}
