interface IWhiteListDescItem {
  /** 原型对象，用于 instanceof 比较 */
  instanceType?: any;
  props?: PropertyKey[];
  proxyProps?: Record<string, <T>(target: T) => T>;
}

type IWhiteListItemArray = Array<PropertyKey | IWhiteListDescItem>;

interface IWhiteList {
  allowAccessProps?: IWhiteListItemArray;
  allowMethods?: IWhiteListItemArray;
  allowModifyProps?: IWhiteListItemArray;
}

interface IProxyDomElementOptions {
  isSimple?: boolean;
  extraWhiteList?: Partial<IWhiteList>;
}

interface IProxyEventOptions {
  isNativeEvent?: boolean;
  extraWhiteList?: Partial<IWhiteList>;
  extraDOMWhiteList?: Partial<IWhiteList>;
}

/** Youzan alcatraz sandbox provide variable */
declare const alcatraz: {
  ReactDOMYouzanShared: {
    isYouzanDOMProxy: (obj: any) => boolean;
    getRealDomInYouzanProxy: (obj: any) => Element;
    proxyDomElementForYouzan: <T>(
      obj: T,
      options: IProxyDomElementOptions
    ) => T;
    proxyEventForYouzan: <T>(obj: T, options: IProxyEventOptions) => T;
  };
  zanDomUtils: {
    createElement: typeof document.createElement;
    createElementNS: typeof document.createElementNS;
  };
};

export const isAlcatrazEnv = (function() {
  try {
    return alcatraz && typeof alcatraz === 'object';
  } catch (e) {
    return false;
  }
})();

export const unboxDOMNode = <T>(obj: T): T => {
  return isAlcatrazEnv
    ? (alcatraz.ReactDOMYouzanShared.getRealDomInYouzanProxy(obj) as any)
    : obj;
};

export const boxDOMNode = <T>(
  obj: T,
  options?: Omit<IProxyDomElementOptions, 'isSimple'>
): T => {
  return isAlcatrazEnv && !alcatraz.ReactDOMYouzanShared.isYouzanDOMProxy(obj)
    ? alcatraz.ReactDOMYouzanShared.proxyDomElementForYouzan(obj, {
        ...options,
        isSimple: true,
      })
    : obj;
};

export const boxNativeEvent = <T>(
  obj: T,
  options?: Omit<IProxyEventOptions, 'isNativeEvent'>
): T => {
  return isAlcatrazEnv
    ? alcatraz.ReactDOMYouzanShared.proxyEventForYouzan(obj, {
        ...options,
        isNativeEvent: true,
      })
    : obj;
};

export const boxFnArgs = <T extends Function>(
  fn: T,
  argBoxings: Function[]
): T => {
  return (function(...args) {
    const boxedArgs = args.map((arg, index) =>
      argBoxings[index] ? argBoxings[index](arg) : arg
    );
    return fn?.(...boxedArgs);
  } as unknown) as T;
};

export const alcatrazDomUtils = isAlcatrazEnv && alcatraz.zanDomUtils;
