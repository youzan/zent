import {
  useCallback,
  useRef,
  useEffect,
  useReducer,
  Reducer,
  ReducerState,
  ReducerWithoutAction,
  ReducerStateWithoutAction,
  DispatchWithoutAction,
  Dispatch,
  ReducerAction,
} from 'react';

export function useAsyncSafeReducer<R extends ReducerWithoutAction<any>, I>(
  reducer: R,
  initializerArg: I,
  initializer: (arg: I) => ReducerStateWithoutAction<R>
): [ReducerStateWithoutAction<R>, DispatchWithoutAction];
export function useAsyncSafeReducer<R extends ReducerWithoutAction<any>>(
  reducer: R,
  initializerArg: ReducerStateWithoutAction<R>,
  initializer?: undefined
): [ReducerStateWithoutAction<R>, DispatchWithoutAction];
export function useAsyncSafeReducer<R extends Reducer<any, any>, I>(
  reducer: R,
  initializerArg: I & ReducerState<R>,
  initializer: (arg: I & ReducerState<R>) => ReducerState<R>
): [ReducerState<R>, Dispatch<ReducerAction<R>>];
export function useAsyncSafeReducer<R extends Reducer<any, any>, I>(
  reducer: R,
  initializerArg: I,
  initializer: (arg: I) => ReducerState<R>
): [ReducerState<R>, Dispatch<ReducerAction<R>>];
export function useAsyncSafeReducer<R extends Reducer<any, any>>(
  reducer: R,
  initialState: ReducerState<R>,
  initializer?: undefined
): [ReducerState<R>, Dispatch<ReducerAction<R>>];
export function useAsyncSafeReducer<R extends Reducer<any, any>, I>(
  reducer: R,
  initializerArg: I & ReducerState<R>,
  initializer: (arg: I & ReducerState<R>) => ReducerState<R>
) {
  const mounted = useMounted();
  const [state, dispatch] = useReducer(reducer, initializerArg, initializer);
  const _dispatch = useCallback<typeof dispatch>(
    (...args: Parameters<typeof dispatch>) => {
      mounted.current && dispatch(...args);
    },
    [mounted]
  );

  return [state, _dispatch];
}

function useMounted() {
  const ref = useRef(false);
  useEffect(() => {
    ref.current = true;
    return () => {
      ref.current = false;
    };
  });
  return ref;
}
