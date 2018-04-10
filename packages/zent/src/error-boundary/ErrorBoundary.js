import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';

import ErrorBoundaryFallbackComponent from './Fallback';

function getComponentStack(info) {
  return info ? info.componentStack : '';
}

class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onError: PropTypes.func,
    FallbackComponent: PropTypes.func,
  };

  static defaultProps = {
    FallbackComponent: ErrorBoundaryFallbackComponent,
  };

  state = {
    error: null,
    info: null,
  };

  componentDidCatch(error, info) {
    const { onError } = this.props;

    if (isFunction(onError)) {
      // In case onError throws
      try {
        onError(error, getComponentStack(info));
      } catch (ignoredError) {
        /* empty block */
      }
    }

    this.setState({ error, info });
  }

  render() {
    const { children, FallbackComponent } = this.props;
    const { error, info } = this.state;

    if (error !== null) {
      return (
        <FallbackComponent
          componentStack={getComponentStack(info)}
          error={error}
        />
      );
    }

    return children;
  }
}

export default ErrorBoundary;
