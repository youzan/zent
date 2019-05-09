import * as React from 'react';
import { usePopup } from './Popup';
import { IPositionCalculator } from './position';

export interface IClickProps<E extends Element> {
  onClick: React.MouseEventHandler<E>;
}

export function useClickPopup<
  Anchor extends Element,
  Content extends Element = HTMLDivElement
>(
  pos: IPositionCalculator<Anchor, Content>,
  props?: Partial<IClickProps<Anchor>>
) {
  const popup = usePopup<Anchor, Content>(pos);
  const propsRef = React.useRef(props);
  propsRef.current = props;
  const anchorProps = React.useMemo(
    () => ({
      ref: popup.anchorRef,
      onClick(e: React.MouseEvent<Anchor>) {
        const props = propsRef.current;
        if (props) {
          const { onClick } = props;
          onClick && onClick(e);
        }
        popup.setVisible(!popup.visible);
      },
    }),
    [popup]
  );
  React.useEffect(() => {
    function onClick(e: MouseEvent) {
      const anchor = popup.anchorRef.current;
      const portal = popup.portalRef.current;
      const { target } = e;
      if (!anchor || !portal || !popup.visible) {
        return;
      }
      if (
        target instanceof Node &&
        !anchor.contains(target) &&
        !portal.contains(target)
      ) {
        popup.setVisible(false);
      }
    }
    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('click', onClick);
    };
  }, []);
  return [anchorProps, popup];
}
