import ErrorBoundary, {
  IErrorBoundaryFallbackComponentProps,
  IOnErrorCallback,
} from './ErrorBoundary';

export interface IWithErrorBoundaryOption<P> {
  Component?: React.ComponentType<P>;
  FallbackComponent?: React.ComponentType<IErrorBoundaryFallbackComponentProps>;
  onError?: IOnErrorCallback;
}

export function withErrorBoundary<P>({
  Component: BaseComponent,
  FallbackComponent,
  onError,
}: IWithErrorBoundaryOption<P> = {}) {
  const ErrorBoundaryInner = (props: P) => (
    <ErrorBoundary FallbackComponent={FallbackComponent} onError={onError}>
      <BaseComponent {...props} />
    </ErrorBoundary>
  );
  return ErrorBoundaryInner;
}

export default withErrorBoundary;
