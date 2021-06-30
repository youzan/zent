/**
 * Get current scroll position in page
 */
export default function getScrollPosition() {
  const { pageXOffset, pageYOffset } = window;
  const x =
    pageXOffset !== undefined
      ? pageXOffset
      : (
          (document.documentElement ||
            document.body.parentNode ||
            document.body) as any
        ).scrollLeft;

  const y =
    pageYOffset !== undefined
      ? pageYOffset
      : (
          (document.documentElement ||
            document.body.parentNode ||
            document.body) as any
        ).scrollTop;

  return {
    x,
    y,
  };
}
