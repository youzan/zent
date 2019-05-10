import * as React from 'react';
import cx from 'classnames';
import * as Position from './position';
import { IPositionCalculator } from './position';
import Portal, { IPortalImperativeHandlers } from '../portal';
import { getPositionedParent } from './utils';

function getRelative(
  anchorRect: ClientRect | DOMRect,
  parentRect: ClientRect | DOMRect
): ClientRect {
  const { left, top } = parentRect;
  return {
    width: parentRect.width,
    height: parentRect.height,
    top: anchorRect.top - top,
    left: anchorRect.left - left,
    bottom: anchorRect.bottom - top,
    right: anchorRect.right - left,
  };
}

export class Popup<Anchor extends Element, Content extends Element> {
  private scheduled = false;

  constructor(
    readonly anchorRef: React.RefObject<Anchor | undefined>,
    readonly contentRef: React.MutableRefObject<Content | null>,
    private _visible: boolean,
    readonly setVisible: (visible: boolean) => void,
    public positionCalculator: IPositionCalculator<Anchor, Content>,
    private readonly setProps: (style: Position.IPositionProps) => void,
    public props: Position.IPositionProps,
    public cushion: number,
    readonly portalRef: React.RefObject<IPortalImperativeHandlers>
  ) {}

  get visible() {
    return this._visible;
  }

  set visible(visible: boolean) {
    this.setVisible(visible);
  }

  adjustPosition(sync = false) {
    if (sync) {
      this.adjustPositionImpl();
    } else if (!this.scheduled) {
      this.scheduled = true;
      requestAnimationFrame(this.doAdjustPosition);
    }
  }

  private doAdjustPosition = () => {
    this.adjustPositionImpl();
  };

  private adjustPositionImpl() {
    this.scheduled = false;
    const anchor = this.anchorRef.current;
    const content = this.contentRef.current;
    const portal = this.portalRef.current;
    if (!anchor || !content || !portal || !this.visible) {
      return;
    }
    const positionedParent = getPositionedParent(portal.container);
    if (positionedParent === null) {
      return;
    }
    const positionedParentRect = positionedParent.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();
    const anchorRect = anchor.getBoundingClientRect();
    const relativeRect = getRelative(anchorRect, positionedParentRect);
    const { positionCalculator, cushion } = this;
    const props = positionCalculator({
      cushion,
      contentRect,
      anchorRect,
      positionedParentRect,
      relativeRect,
    });
    this.setProps(props);
  }

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

export function usePopup<
  Anchor extends Element,
  Content extends Element = HTMLDivElement
>(
  pos: IPositionCalculator<Anchor, Content>,
  { cushion = 10 }: Partial<IUsePopupOptions> = {}
) {
  const anchorRef = React.useRef<Anchor>();
  const contentRef = React.useRef<Content | null>(null);
  const portalRef = React.useRef<IPortalImperativeHandlers>(null);
  const [visible, setVisible] = React.useState(false);
  const [props, setProps] = React.useState<Position.IPositionProps>(
    Position.INVISIBLE_POSITION
  );
  const popup = React.useMemo(
    () =>
      new Popup<Anchor, Content>(
        anchorRef,
        contentRef,
        visible,
        setVisible,
        Position.invisible,
        setProps,
        props,
        cushion,
        portalRef
      ),
    []
  );
  (popup as any)._visible = visible;
  popup.positionCalculator = pos;
  popup.props = props;
  return popup;
}

export interface IPopupContentProps<
  Anchor extends Element,
  Content extends Element
> {
  popup: Popup<Anchor, Content>;
  children?: React.ReactNode;
  arrow?: boolean;
}

export function PopupContent<Anchor extends Element>({
  popup,
  arrow = true,
  children,
}: IPopupContentProps<Anchor, HTMLDivElement>) {
  const { visible, props } = popup;
  React.useLayoutEffect(() => {
    popup.adjustPosition();
  }, [children, visible]);
  return (
    <Portal
      ref={popup.portalRef}
      className={cx('zent-popup-portal', props.className)}
      visible={popup.visible}
      style={props.style}
    >
      <div ref={popup.contentRef} className="zent-popup zent-popup-content">
        {children}
      </div>
      {arrow ? <div className="zent-popup-arrow" /> : null}
    </Portal>
  );
}
