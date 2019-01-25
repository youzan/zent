import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PortalContent extends Component {
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
    return <>{this.props.children}</>;
  }
}
