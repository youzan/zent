import * as React from 'react';
import ErrorBoundary, {
  IErrorBoundaryFallbackComponentProps,
} from './ErrorBoundary';

export interface ICatchErrorOption {
  onError?: (error: Error, componentStack: string) => void;
  FallbackComponent?: React.ComponentType<IErrorBoundaryFallbackComponentProps>;
}

export const catchError = ({
  FallbackComponent,
  onError,
}: ICatchErrorOption = {}) => BaseComponent => props => (
  <ErrorBoundary FallbackComponent={FallbackComponent} onError={onError}>
    <BaseComponent {...props} />
  </ErrorBoundary>
);

export default catchError;
