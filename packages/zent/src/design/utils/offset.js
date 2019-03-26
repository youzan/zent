export default function offset(node) {
  const y = window.pageYOffset;
  const x = window.pageXOffset;
  const bb = node.getBoundingClientRect();
  return {
    top: bb.top + y,
    left: bb.left + x,
  };
}
