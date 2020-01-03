import * as React from 'react';
import isChrome from '../utils/isChrome';
import { IMECompositionContext } from './context';

const EMIT_CHANGE_AFTER_COMPOSITION_END = isChrome;

export interface ICreateUseIMECompositionOption {
  getEventValue?: (...args: any[]) => string;
}

export interface IUseIMECompositionResult<OnChange> {
  value: string;
  onChange: OnChange;
  onCompositionStart: React.CompositionEventHandler;
  onCompositionEnd: React.CompositionEventHandler;
}

const defaultOption: Required<ICreateUseIMECompositionOption> = {
  getEventValue: e => e.target.value,
};

export function createUseIMEComposition(
  option?: ICreateUseIMECompositionOption
) {
  const { getEventValue } = { ...defaultOption, ...option };

  return function useIMEComposition<OnChange extends (...args: any[]) => any>(
    propValue: string,
    onChangeProp?: OnChange,
    onCompositionStartProp?: React.CompositionEventHandler,
    onCompositionEndProp?: React.CompositionEventHandler
  ): IUseIMECompositionResult<OnChange> {
    const ctx = React.useContext(IMECompositionContext);
    const isCompositionRef = React.useRef(false);
    const [compositionValue, setCompositionValue] = React.useState(propValue);

    const onChangeRef = React.useRef(onChangeProp);
    const onCompositionStartRef = React.useRef(onCompositionStartProp);
    const onCompositionEndRef = React.useRef(onCompositionEndProp);
    React.useEffect(() => {
      onChangeRef.current = onChangeProp;
      onCompositionStartRef.current = onCompositionStartProp;
      onCompositionEndRef.current = onCompositionEndProp;
    }, [onChangeProp, onCompositionStartProp, onCompositionEndProp]);

    const onCompositionValueChange = React.useCallback(
      ((...args) => {
        if (isCompositionRef.current) {
          setCompositionValue(getEventValue(...args));
          // 若输入法正在输入，则不触发上层组件的事件
          return;
        }
        return onChangeRef.current?.(...args);
      }) as OnChange,
      [onChangeRef]
    );

    const onCompositionStart: React.CompositionEventHandler = React.useCallback(
      e => {
        isCompositionRef.current = true;
        onCompositionStartRef.current?.(e);
      },
      [onCompositionStartRef]
    );

    const onCompositionEnd: React.CompositionEventHandler = React.useCallback(
      e => {
        isCompositionRef.current = false;
        onCompositionEndRef.current?.(e);
        // chrome 的 onCompositionEnd 事件在 onChange 后触发，需要在 onCompositionEnd 后额外触发一次 onChange 事件
        if (EMIT_CHANGE_AFTER_COMPOSITION_END) {
          e.type = 'change';
          onChangeRef.current?.(e);
        }
      },
      [onCompositionEndRef, onChangeRef]
    );

    // 只处理受控的组件
    const isControlled = propValue !== undefined;
    const passCompositionHandler = isControlled && ctx.enable;
    const passCompositionValue =
      isControlled && ctx.enable && isCompositionRef.current;

    return {
      value: passCompositionValue ? compositionValue : propValue,
      onChange: passCompositionHandler
        ? onCompositionValueChange
        : onChangeProp,
      onCompositionStart: passCompositionHandler
        ? onCompositionStart
        : onCompositionStartProp,
      onCompositionEnd: passCompositionHandler
        ? onCompositionEnd
        : onCompositionEndProp,
    };
  };
}
