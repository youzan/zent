import * as React from 'react';

export interface IPortalContentProps {
  onMount?: () => void;
  onUnmount?: () => void;
}

export default class PortalContent extends React.Component<
  IPortalContentProps
> {
  componentDidMount() {
    const { onMount } = this.props;

    onMount && onMount();
  }

  componentWillUnmount() {
    const { onUnmount } = this.props;

    onUnmount && onUnmount();
  }

  render() {
    return this.props.children;
  }
}
