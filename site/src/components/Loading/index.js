import React from 'react';

import './style.pcss';

export default function DocLoading({ error, timedOut, pastDelay }) {
  if (error) {
    return <Error />;
  }

  if (timedOut) {
    return <Error />;
  }

  if (pastDelay) {
    return <Loading />;
  }

  return null;
}

function Loading() {
  return (
    <div className="zandoc-react-loading">
      <div className="zandoc-react-loading-ripple">
        <div />
        <div />
      </div>
    </div>
  );
}

function Error() {
  return (
    <div className="zandoc-react-loading-error">Oops! An error occurred.</div>
  );
}
