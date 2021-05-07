import { useContext, useState, useRef, useCallback, useEffect } from 'react';
import { IMECompositionContext } from './context';

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
type ElementType = HTMLInputElement | HTMLTextAreaElement;
export function createUseIMEComposition(
  option?: ICreateUseIMECompositionOption
) {
  const { getEventValue } = { ...defaultOption, ...option };

  return function useIMEComposition<OnChange extends (...args: any[]) => any>(
    propValue: string,
    onChangeProp?: OnChange,
    onCompositionStartProp?: React.CompositionEventHandler<ElementType>,
    onCompositionEndProp?: React.CompositionEventHandler<ElementType>
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

    useEffect(() => {
      setCompositionValue(propValue);
    }, [propValue]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onCompositionValueChange = useCallback(
      ((...args) => {
        const targetValue = getEventValue(...args);
        // 若输入值没更新，则不触发上层组件的事件
        if (targetValue === compositionValue) {
          return;
        }
        // 若输入法正在输入，则不触发上层组件的事件
        if (isCompositionRef.current) {
          setCompositionValue(targetValue);
          return;
        }
        return onChangeRef.current?.(...args);
      }) as OnChange,
      [compositionValue, onChangeRef]
    );

    const onCompositionStart: React.CompositionEventHandler<ElementType> = useCallback(
      e => {
        isCompositionRef.current = true;
        onCompositionStartRef.current?.(e);
      },
      [onCompositionStartRef]
    );

    const onCompositionEnd: React.CompositionEventHandler<ElementType> = useCallback(
      e => {
        isCompositionRef.current = false;
        onCompositionEndRef.current?.(e);
        const currentValue = e.currentTarget.value;
        setCompositionValue(currentValue);
        // 输入值更新时，手动触发 onChange 事件
        if (currentValue !== propValue) {
          e.type = 'change';
          onChangeRef.current?.(e);
        }
      },
      [propValue, onCompositionEndRef, onChangeRef]
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
