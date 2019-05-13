import * as React from 'react';
import { usePopup, Popup } from './Popup';
import { IPositionCalculator } from './position';
import { IDot, isLineIntersectRect, ILine, IRect } from './utils';

const SPEED_THRESHOLD = 5;

function boundingClientRectToIRect({
  left,
  top,
  width,
  height,
}: ClientRect | DOMRect): IRect {
  return {
    a: {
      x: left,
      y: top,
    },
    b: {
      x: left + width,
      y: top,
    },
    c: {
      x: left,
      y: top + height,
    },
    d: {
      x: left + width,
      y: top + height,
    },
  };
}

function windowMouseMove<Anchor extends Element, Content extends Element>(
  positionRef: React.MutableRefObject<IDot>,
  isMouseIn: React.RefObject<boolean>,
  timeRef: React.MutableRefObject<number>,
  e: MouseEvent,
  popup: Popup<Anchor, Content>
) {
  const prev = positionRef.current;
  const x = e.clientX;
  const y = e.clientY;
  const pos = {
    x,
    y,
  };
  positionRef.current = pos;
  const now = Date.now();
  const prevTime = timeRef.current;
  timeRef.current = now;
  const anchor = popup.anchorRef.current;
  const content = popup.contentRef.current;
  if (isMouseIn.current || !prev || !content || !anchor || !popup.visible) {
    return;
  }
  const duration = now - prevTime;
  const distance =
    Math.sqrt(Math.pow(x - prev.x, 2) + Math.pow(y - prev.y, 2)) * 1000;
  const speed = distance / duration;
  const line: ILine = {
    a: prev,
    b: pos,
  };
  const contentRect = boundingClientRectToIRect(
    content.getBoundingClientRect()
  );
  const anchorRect = boundingClientRectToIRect(anchor.getBoundingClientRect());
  const isTowardsAnchor = isLineIntersectRect(line, anchorRect);
  const isTowardsContent = isLineIntersectRect(line, contentRect);
  console.log(distance, duration, speed);
  if (speed > SPEED_THRESHOLD && (isTowardsAnchor || isTowardsContent)) {
    return;
  }
  popup.setVisible(false);
}

export interface IHoverProps<E extends Element> {
  onMouseEnter: React.MouseEventHandler<E>;
  onMouseLeave: React.MouseEventHandler<E>;
}

export function useHoverPopup<
  Anchor extends Element,
  Content extends Element = HTMLDivElement
>(
  pos: IPositionCalculator<Anchor, Content>,
  props?: Partial<IHoverProps<Anchor>>
) {
  const popup = usePopup<Anchor, Content>(pos);
  const propsRef = React.useRef(props);
  propsRef.current = props;
  const isMouseIn = React.useRef(false);
  const positionRef = React.useRef<IDot | null>(null);
  const timeRef = React.useRef(0);
  const anchorProps = React.useMemo<IHoverProps<Anchor>>(
    () => ({
      ref: popup.anchorRef,
      onMouseEnter(e) {
        const props = propsRef.current;
        if (props) {
          const { onMouseEnter } = props;
          onMouseEnter && onMouseEnter(e);
        }
        isMouseIn.current = true;
        popup.setVisible(true);
      },
      onMouseLeave(e) {
        const props = propsRef.current;
        if (props) {
          const { onMouseLeave } = props;
          onMouseLeave && onMouseLeave(e);
        }
        isMouseIn.current = false;
      },
    }),
    [popup]
  );
  React.useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      windowMouseMove(positionRef, isMouseIn, timeRef, e, popup);
    }
    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);
  return [anchorProps, popup];
}
