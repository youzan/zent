/// <reference types="react" />

declare module 'zent/lib/error-boundary' {
  interface IErrorBoundaryFallbackComponentProps {
    error: Error;
    componentStack: string;
  }

  interface IOnErrorCallback {
    (error: Error, componentStack: string): void;
  }

  interface IErrorBoundaryProps {
    children?: React.ReactChild;
    onError?: IOnErrorCallback;
    FallbackComponent?: React.Component<
      IErrorBoundaryFallbackComponentProps,
      any
    >;
  }

  class ErrorBoundary extends React.Component<IErrorBoundaryProps, any> {}

  namespace ErrorBoundary {
    function withErrorBoundary(spec: {
      Component: React.Component<any, any>;
      FallbackComponent?: React.Component<
        IErrorBoundaryFallbackComponentProps,
        any
      >;
      onError?: IOnErrorCallback;
    }): React.Component<any, any>;

    function catchError(spec: {
      onError?: (error: Error, componentStack: string) => void,
      FallbackComponent?: React.ReactElement<IErrorBoundaryFallbackComponentProps>;
    }): (baseComponent: React.Component) => React.Component

  }

  export default ErrorBoundary;
}
