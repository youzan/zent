import ErrorBoundary from './ErrorBoundary';
import withErrorBoundary from './withErrorBoundary';
import catchError from './catchError';

ErrorBoundary.withErrorBoundary = withErrorBoundary;
ErrorBoundary.catchError = catchError;

export default ErrorBoundary;
