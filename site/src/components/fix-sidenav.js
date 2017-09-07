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

function reachedPageTop() {
  return window.scrollY < 20;
}

function onVisibilityChange(el, callback) {
  let oldVisible;
  let oldReachTop;

  return throttle(() => {
    const visible = isElementInViewport(el);
    const reachTop = reachedPageTop();
    let changed = false;

    if (visible !== oldVisible) {
      oldVisible = visible;
      changed = true;
    }

    if (reachTop !== oldReachTop) {
      oldReachTop = reachTop;
      changed = true;
    }

    if (isFunction(callback) && changed) {
      callback(visible, reachTop);
    }
  }, 16);
}

export default function setupListeners(footerElement, navElment) {
  const handler = onVisibilityChange(footerElement, (visible, reachTop) => {
    console.log(visible, reachTop);
    if (visible) {
      navElment.classList.add('bottom-reached');
    } else {
      navElment.classList.remove('bottom-reached');
    }

    if (reachTop) {
      navElment.classList.add('top-reached');
    } else {
      navElment.classList.remove('top-reached');
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
