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

  constructor(props: ILazyMountProps) {
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

  static getDerivedStateFromProps(
    props: ILazyMountProps,
    state: ILazyMountState
  ) {
    if (props.mount && !state.mounted) {
      return {
        mounted: true,
      };
    }

    return null;
  }
}
