import * as React from 'react';
import { usePopup } from './Popup';
import { IPositionCalculator } from './position';

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
  const anchorProps = React.useMemo<IHoverProps<Anchor>>(
    () => ({
      ref: popup.anchorRef,
      onMouseEnter(e) {
        const props = propsRef.current;
        if (props) {
          const { onMouseEnter } = props;
          onMouseEnter && onMouseEnter(e);
        }
        popup.setVisible(true);
      },
      onMouseLeave(e) {
        const props = propsRef.current;
        if (props) {
          const { onMouseLeave } = props;
          onMouseLeave && onMouseLeave(e);
        }
        popup.setVisible(false);
      },
    }),
    [popup]
  );
  return [anchorProps, popup];
}
