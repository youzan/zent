export function formatMaxSize(size) {
  if (size < 1024) {
    return `${size}b`;
  } else if (size >= 1024 && size < 1024 * 1024) {
    return `${(size / 1024).toFixed(0)}K`;
  }
  return `${(size / 1024 / 1024).toFixed(0)}M`;
}
