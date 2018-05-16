import React from 'react';
import Icon from 'icon';
import Pop from 'pop';

const stackTraceStyle = {
  whiteSpace: 'pre',
};

export default function ErrorBoundaryFallbackComponent({
  componentStack,
  error,
}) {
  return (
    <div className={`zent-error-boundary-fallback-component`}>
      <div className={`zent-error-boundary-fallback-component__error`}>
        <Pop
          trigger="hover"
          position="auto-bottom-center"
          display="inline-block"
          centerArrow
          content={<div style={stackTraceStyle}>{componentStack}</div>}
        >
          <Icon type="error-circle" />
        </Pop>
        <span>{error.toString()}</span>
      </div>
    </div>
  );
}
