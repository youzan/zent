export interface IPositionCalculatorOptions<
  Anchor extends Element,
  Content extends Element
> {
  anchor: Anchor;
  content: Content;
  cushion: number;
}

export interface IPositionCalculator<
  Anchor extends Element,
  Content extends Element
> {
  (anchor: IPositionCalculatorOptions<Anchor, Content>): Partial<
    CSSStyleDeclaration
  >;
  name: string;
}

export function invisible(): Partial<CSSStyleDeclaration> {
  return {
    position: 'absolute',
    top: '-9999px',
    left: '-9999px',
  };
}

export function rightCenter<Anchor extends Element, Content extends Element>({
  anchor,
  cushion,
  content,
}: IPositionCalculatorOptions<Anchor, Content>) {
  const { right, top, bottom } = anchor.getBoundingClientRect();
  const x = right + cushion;
  const middle = (top + bottom) / 2;
  const y = middle - content.getBoundingClientRect().height / 2;
  return {
    position: 'absolute',
    left: `${Math.round(x)}px`,
    top: `${Math.round(y)}px`,
  };
}
