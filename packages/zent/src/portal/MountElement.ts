import * as React from 'react';

export interface IMountElementProps {
  node: HTMLElement;
  parent: Element;
}

const MountElement = ({ node, parent }: IMountElementProps) => {
  React.useLayoutEffect(() => {
    parent.appendChild(node);
    return () => {
      parent.removeChild(node);
    };
  }, [node, parent]);
  return null;
};

export default MountElement;
