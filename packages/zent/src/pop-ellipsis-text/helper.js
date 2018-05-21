export function isPercent(value) {
  return typeof value === 'string' && value.indexOf('%') !== -1;
}

export function calPercentValue(value, percent) {
  const num = +percent.replace('%', '');
  return value * num / 100;
}

export function getFont(style = {}) {
  const fontSize = style.fontSize || '12px';
  const fontFamily = style.fontFamily || 'Helvetica';
  const fontWeight = style.fontWeight || '400';

  return `${fontSize} ${fontFamily} ${fontWeight}`;
}

export function calcWidth(text, font) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}
