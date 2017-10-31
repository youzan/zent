/* eslint-disable no-script-url */

import React from 'react';
import { slugify } from 'transliteration';

export function H1(props) {
  const { children } = props;

  const id = slugify(children);

  return (
    <h1 className="anchor-heading">
      <a href={`#${id}`}>¶</a>
      <a href="javascript:void(0)" id={id} className="anchor-point" />
      {children}
    </h1>
  );
}

export function H2(props) {
  const { children } = props;
  const id = slugify(children);

  return (
    <h2 className="anchor-heading">
      <a href={`#${id}`}>¶</a>
      <a href="javascript:void(0)" id={id} className="anchor-point" />
      {children}
    </h2>
  );
}

export function H3(props) {
  const { children } = props;
  const id = slugify(children);

  return (
    <h3 className="anchor-heading">
      <a href={`#${id}`}>¶</a>
      <a href="javascript:void(0)" id={id} className="anchor-point" />
      {children}
    </h3>
  );
}

export function H4(props) {
  const { children } = props;
  const id = slugify(children);

  return (
    <h4 className="anchor-heading">
      <a href={`#${id}`}>¶</a>
      <a href="javascript:void(0)" id={id} className="anchor-point" />
      {children}
    </h4>
  );
}

export function H5(props) {
  const { children } = props;
  const id = slugify(children);

  return (
    <h5 className="anchor-heading">
      <a href={`#${id}`}>¶</a>
      <a href="javascript:void(0)" id={id} className="anchor-point" />
      {children}
    </h5>
  );
}

export function H6(props) {
  const { children } = props;
  const id = slugify(children);

  return (
    <h6 className="anchor-heading">
      <a href={`#${id}`}>¶</a>
      <a href="javascript:void(0)" id={id} className="anchor-point" />
      {children}
    </h6>
  );
}
