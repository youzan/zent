exports.prefix = getPrefix();

function getPrefix() {
  if (process.env.NODE_ENV !== 'production') {
    return '/';
  }

  if (process.env.VERSION === 'beta') {
    return '/zent-beta/';
  }

  return '/zent/';
}
