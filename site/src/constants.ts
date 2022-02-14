function getPrefix(): string {
  if (process.env.NODE_ENV !== 'production') {
    return '/';
  }

  if (process.env.VERSION === 'beta') {
    return '/zent-beta/';
  }

  return '/zent-v9/';
}

export const prefix = getPrefix();
