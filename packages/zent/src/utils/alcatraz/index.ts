export const isAlcatrazEnv = (function() {
  try {
    return alcatraz && typeof alcatraz === 'object';
  } catch (e) {
    return false;
  }
})();

// isBoxed
export const isBoxed =
  isAlcatrazEnv && alcatraz.ReactDOMYouzanShared.isYouzanDOMProxy;

// unbox
export const unbox = <T>(obj: T): T => {
  return isAlcatrazEnv
    ? (alcatraz.ReactDOMYouzanShared.getRealDomInYouzanProxy(obj) as any)
    : obj;
};

export const alcatrazDomUtils = isAlcatrazEnv && alcatraz.zanDomUtils;
