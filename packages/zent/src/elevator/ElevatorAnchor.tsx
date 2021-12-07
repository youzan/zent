import { FC, useContext, useEffect, useRef } from 'react';
import { Waypoint } from '../waypoint';
import { ElevatorContext } from './context';

export interface IElevatorAnchorProps {
  link: string;
}

export const ElevatorAnchor: FC<IElevatorAnchorProps> = ({
  link,
  children,
}) => {
  const { offsetTop, getContainer, onAnchorEnter, registerAnchor } =
    useContext(ElevatorContext);

  const ref = useRef<HTMLDivElement>(null);

  const handleAnchorEnter = () => {
    onAnchorEnter(link);
  };

  useEffect(() => {
    registerAnchor(link, ref.current);
  }, [link, registerAnchor]);

  return (
    <Waypoint
      bottomOffset={offsetTop}
      onEnter={handleAnchorEnter}
      scrollableAncestor={getContainer?.() || window}
    >
      <div className="zent-elevator-anchor" ref={ref}>
        {children}
      </div>
    </Waypoint>
  );
};
