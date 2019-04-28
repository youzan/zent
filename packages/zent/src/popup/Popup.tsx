import * as React from 'react';
import * as Position from './position';
import { IPositionCalculator } from './position';

class Popup<Anchor extends Element, Content extends Element> {
  private scheduled = false;

  constructor(
    readonly anchorRef: React.RefObject<Anchor | undefined>,
    readonly contentRef: React.MutableRefObject<Content | null>,
    public visible: boolean,
    readonly setVisible: (visible: boolean) => void,
    public positionCalculator: IPositionCalculator<Anchor, Content>,
    private readonly setStyle: (style: Partial<CSSStyleDeclaration>) => void,
    public style: Partial<CSSStyleDeclaration>,
    public cushion: number
  ) {}

  adjustPosition(sync = false) {
    if (sync) {
      this.adjustPositionImpl();
    } else if (!this.scheduled) {
      this.scheduled = true;
      requestAnimationFrame(this.adjustPositionImpl);
    }
  }

  private adjustPositionImpl = () => {
    this.scheduled = false;
    const anchor = this.anchorRef.current;
    const content = this.contentRef.current;
    if (!anchor || !content) {
      return;
    }
    const { positionCalculator, cushion } = this;
    const style = positionCalculator({
      anchor,
      content,
      cushion,
    });
    this.setStyle(style);
  };

  open() {
    this.setVisible(true);
  }

  close() {
    this.setVisible(false);
  }
}

export interface IUsePopupOptions {
  cushion: number;
}

export function usePopup<Anchor extends Element, Content extends Element>(
  pos: IPositionCalculator<Anchor, Content>,
  { cushion = 0 }: Partial<IUsePopupOptions> = {}
) {
  const anchorRef = React.useRef<Anchor>();
  const contentRef = React.useRef<Content | null>(null);
  const [visible, setVisible] = React.useState(false);
  const [style, setStyle] = React.useState<Partial<CSSStyleDeclaration>>({});
  const popup = React.useMemo(
    () =>
      new Popup<Anchor, Content>(
        anchorRef,
        contentRef,
        visible,
        setVisible,
        Position.invisible,
        setStyle,
        style,
        cushion
      ),
    []
  );
  popup.visible = visible;
  popup.positionCalculator = pos;
  popup.style = style;
  React.useLayoutEffect(() => {
    popup.adjustPosition();
  });
  return popup;
}

export interface IHoverProps<E extends Element> {
  onMouseEnter: React.MouseEventHandler<E>;
  onMouseLeave: React.MouseEventHandler<E>;
}

export function useHoverPopup<Anchor extends Element, Content extends Element>(
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

export interface IPopupContentProps<
  Anchor extends Element,
  Content extends Element
> {
  popup: Popup<Anchor, Content>;
  children?: React.ReactNode;
}

export function PopupContent<Anchor extends Element, Content extends Element>({
  ,
}: IPopupContentProps<Anchor, Content>) {}
