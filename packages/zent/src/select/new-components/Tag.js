import * as React from 'react';

const Tag = ({ _cn: cn, text, className, onDelete }) => (
  <li className={className}>
    <div className={cn('tag-content')}>{text}</div>
    <span onClick={onDelete} className={cn('tag-remover')} />
  </li>
);

export default Tag;
