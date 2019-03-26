/**
 * Get current scroll position in page
 */
export default function getScrollPosition() {
  const x =
    window.pageXOffset !== undefined
      ? window.pageXOffset
      : ((document.documentElement ||
          document.body.parentNode ||
          document.body) as any).scrollLeft;

  const y =
    window.pageYOffset !== undefined
      ? window.pageYOffset
      : ((document.documentElement ||
          document.body.parentNode ||
          document.body) as any).scrollTop;

  return {
    x,
    y,
  };
}
