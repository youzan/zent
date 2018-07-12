import React from 'react';
import ErrorBoundary from './ErrorBoundary';

const catchError = ({
  FallbackComponent,
  onError,
} = {}) => BaseComponent => props => (
  <ErrorBoundary FallbackComponent={FallbackComponent} onError={onError}>
    <BaseComponent {...props} />
  </ErrorBoundary>
);

export default catchError;
