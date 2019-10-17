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
  const { getEventValue } = Object.assign({}, defaultOption, option);

  return function useIMEComposition<OnChange extends (...args: any[]) => any>(
    propValue: string,
    onChangeProp?: OnChange,
    onCompositionStartProp?: React.CompositionEventHandler,
    onCompositionEndProp?: React.CompositionEventHandler
  ): IUseIMECompositionResult<OnChange> {
    const ctx = React.useContext(IMECompositionContext);
    const isCompositionRef = React.useRef(false);
    const [compositionValue, setCompositionValue] = React.useState(propValue);

    React.useEffect(() => {
      if (!isCompositionRef.current) {
        setCompositionValue(propValue);
      }
    }, [propValue]);

    const onCompositionValueChange = React.useCallback(
      ((...args) => {
        setCompositionValue(getEventValue(...args));
        if (isCompositionRef.current) {
          // 若输入法正在输入，则不触发上层组件的事件
          return;
        }
        return onChangeProp && onChangeProp(...args);
      }) as OnChange,
      [onChangeProp]
    );

    const onCompositionStart: React.CompositionEventHandler = React.useCallback(
      e => {
        isCompositionRef.current = true;
        onCompositionStartProp && onCompositionStartProp(e);
      },
      [onCompositionStartProp]
    );

    const onCompositionEnd: React.CompositionEventHandler = React.useCallback(
      e => {
        isCompositionRef.current = false;
        onCompositionEndProp && onCompositionEndProp(e);
        // chrome 的 onCompositionEnd 事件在 onChange 后触发，需要在 onCompositionEnd 后额外触发一次 onChange 事件
        if (EMIT_CHANGE_AFTER_COMPOSITION_END) {
          e.type = 'change';
          onChangeProp && onChangeProp(e);
        }
      },
      [onCompositionEndProp, onChangeProp]
    );

    return {
      value: ctx.enable ? compositionValue : propValue || '',
      onChange: ctx.enable ? onCompositionValueChange : onChangeProp,
      onCompositionStart,
      onCompositionEnd,
    };
  };
}
