import * as React from 'react';
import { Component } from 'react';
import isFunction from 'lodash-es/isFunction';

import ErrorBoundaryFallbackComponent from './Fallback';
import catchError from './catchError';
import withErrorBoundary from './withErrorBoundary';

function getComponentStack(info) {
  return info ? info.componentStack : '';
}

export interface IOnErrorCallback {
  (error: Error, componentStack: string): void;
}

export interface IErrorBoundaryFallbackComponentProps {
  error: Error;
  componentStack: string;
}

export interface IErrorBoundaryProps {
  onError?: IOnErrorCallback;
  FallbackComponent?: React.ComponentType<IErrorBoundaryFallbackComponentProps>;
}

export class ErrorBoundary extends Component<IErrorBoundaryProps> {
  static defaultProps = {
    FallbackComponent: ErrorBoundaryFallbackComponent,
  };

  static withErrorBoundary = withErrorBoundary;
  static catchError = catchError;

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
