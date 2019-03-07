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
    let { children } = this.props;
    let { mounted } = this.state;

    return mounted ? children : null;
  }

  componentWillReceiveProps(nextProps) {
    let { mount } = nextProps;
    let { mounted } = this.state;
    if (mount && !mounted) {
      this.setState({
        mounted: true,
      });
    }
  }
}
