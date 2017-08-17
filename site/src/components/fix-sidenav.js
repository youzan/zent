import throttle from 'lodash/throttle';
import isFunction from 'lodash/isFunction';

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  const vpBottom = window.innerHeight || document.documentElement.clientHeight;
  const vpRight = window.innerWidth || document.documentElement.clientWidth;

  if (rect.left > vpRight || rect.right < 0) {
    return false;
  }

  if (rect.bottom < 0 || rect.top > vpBottom) {
    return false;
  }

  return true;
}

function onVisibilityChange(el, callback) {
  let oldVisible;

  return throttle(() => {
    const visible = isElementInViewport(el);
    if (visible !== oldVisible) {
      oldVisible = visible;
      if (isFunction(callback)) {
        callback(visible);
      }
    }
  }, 16);
}

export default function setupListeners(footerElement, navElment) {
  const handler = onVisibilityChange(footerElement, visible => {
    if (visible) {
      navElment.classList.add('bottom-reached');
    } else {
      navElment.classList.remove('bottom-reached');
    }
  });

  window.addEventListener('scroll', handler);
  window.addEventListener('resize', handler);

  // trigger handler once when loaded
  setTimeout(handler, 0);

  // returns a function to remove all event listeners
  return () => {
    window.removeEventListener('scroll', handler);
    window.addEventListener('resize', handler);
  };
}
