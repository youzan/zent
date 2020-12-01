import { useContext, useState, useRef, useCallback, useEffect } from 'react';
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
    const ctx = useContext(IMECompositionContext);
    const isCompositionRef = useRef(false);
    const [compositionValue, setCompositionValue] = useState(propValue);

    const onChangeRef = useRef(onChangeProp);
    const onCompositionStartRef = useRef(onCompositionStartProp);
    const onCompositionEndRef = useRef(onCompositionEndProp);
    useEffect(() => {
      onChangeRef.current = onChangeProp;
      onCompositionStartRef.current = onCompositionStartProp;
      onCompositionEndRef.current = onCompositionEndProp;
    }, [onChangeProp, onCompositionStartProp, onCompositionEndProp]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onCompositionValueChange = useCallback(
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

    const onCompositionStart: React.CompositionEventHandler = useCallback(
      e => {
        isCompositionRef.current = true;
        onCompositionStartRef.current?.(e);
      },
      [onCompositionStartRef]
    );

    const onCompositionEnd: React.CompositionEventHandler = useCallback(
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
