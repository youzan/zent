import * as React from 'react';
import ErrorBoundary, {
  IErrorBoundaryFallbackComponentProps,
} from './ErrorBoundary';

export interface IWithErrorBoundaryOption<P> {
  Component?: React.ComponentType<P>;
  FallbackComponent?: React.ComponentType<IErrorBoundaryFallbackComponentProps>;
  onError?: (error: any) => void;
}

export function withErrorBoundary<P>({
  Component: BaseComponent,
  FallbackComponent,
  onError,
}: IWithErrorBoundaryOption<P> = {}) {
  return (props: P) => (
    <ErrorBoundary FallbackComponent={FallbackComponent} onError={onError}>
      <BaseComponent {...props} />
    </ErrorBoundary>
  );
}
export default withErrorBoundary;
