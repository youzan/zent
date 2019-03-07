import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface IPortalContentProps {
  onMount?: () => void;
  onUnmount?: () => void;
}

export default class PortalContent extends React.Component<
  IPortalContentProps
> {
  static propTypes = {
    onMount: PropTypes.func,
    onUnmount: PropTypes.func,
  };

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
