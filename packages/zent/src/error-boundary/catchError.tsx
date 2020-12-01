import ErrorBoundary, {
  IErrorBoundaryFallbackComponentProps,
} from './ErrorBoundary';

export interface ICatchErrorOption {
  onError?: (error: Error, componentStack: string) => void;
  FallbackComponent?: React.ComponentType<IErrorBoundaryFallbackComponentProps>;
}

function catchError({ FallbackComponent, onError }: ICatchErrorOption = {}) {
  return function catchErrorInner<P>(BaseComponent: React.ComponentType<P>) {
    return function CatchError(props: P) {
      return (
        <ErrorBoundary FallbackComponent={FallbackComponent} onError={onError}>
          <BaseComponent {...props} />
        </ErrorBoundary>
      );
    };
  };
}

export default catchError;
