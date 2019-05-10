export function getPositionedParent(node: Element | null): Element | null {
  let parent: Element | null = node;
  if (parent === null) {
    return null;
  }
  while (parent !== null) {
    if (parent === document.body) {
      return document.body;
    }
    const style = getComputedStyle(parent);
    if (style.position !== 'static') {
      return parent;
    }
    parent = parent.parentElement;
  }
  return null;
}

export interface IDot {
  x: number;
  y: number;
}

export interface ILine {
  a: IDot;
  b: IDot;
}

export interface IRect {
  a: IDot;
  b: IDot;
  c: IDot;
  d: IDot;
}

function isUpSide(k: number, b: number, dot: IDot) {
  return dot.x * k + b < dot.y;
}

function isLeft(x: number, dot: IDot) {
  return dot.x < x;
}

export function isLineIntersectRect(line: ILine, rect: IRect): boolean {
  let p = 0;
  if (line.a.x === line.b.x) {
    const { x } = line.a;
    if (isLeft(x, rect.a)) {
      p |= 0b0001;
    }
    if (isLeft(x, rect.b)) {
      p |= 0b0010;
    }
    if (isLeft(x, rect.c)) {
      p |= 0b0100;
    }
    if (isLeft(x, rect.d)) {
      p |= 0b1000;
    }
  } else {
    /**
     * y = kx + b
     */
    const k = (line.b.y - line.a.y) / (line.b.x - line.a.x);
    const b = line.a.y - k * line.a.x;
    if (isUpSide(k, b, rect.a)) {
      p |= 0b0001;
    }
    if (isUpSide(k, b, rect.b)) {
      p |= 0b0010;
    }
    if (isUpSide(k, b, rect.c)) {
      p |= 0b0100;
    }
    if (isUpSide(k, b, rect.d)) {
      p |= 0b1000;
    }
  }
  return !(p === 0b0000 || p === 0b1111);
}
