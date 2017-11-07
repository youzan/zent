import React from 'react';
// import { Loading } from 'zent';

export default function DocLoading({ error, timedOut, pastDelay }) {
  if (error) {
    return <div className="doc-error__root">Error!</div>;
  }

  if (timedOut) {
    return <div className="doc-timeout__root">Timeout!</div>;
  }

  if (pastDelay) {
    return <div>Loading</div>;
  }

  return null;
}
