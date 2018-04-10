import React from 'react';
import ErrorBoundary from './ErrorBoundary';

const withErrorBoundary = ({
  Component: BaseComponent,
  FallbackComponent,
  onError,
}) => props => (
  <ErrorBoundary FallbackComponent={FallbackComponent} onError={onError}>
    <BaseComponent {...props} />
  </ErrorBoundary>
);

export default withErrorBoundary;
