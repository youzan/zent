import { useMemo, FormEvent, useReducer } from 'react';
import {
  ValidateOption,
  $FieldSetValue,
  useForm as superUseForm,
  FormStrategy,
  FormBuilder,
  IForm,
  useValue$,
} from './formulr';
import { Subject } from 'rxjs';
import { useAsyncSafeDispatch } from '../utils/hooks/useAsyncSafeDispatch';
import {
  UnknownFieldSetModelChildren,
  UnknownFieldSetBuilderChildren,
} from './formulr/utils';

export interface IFormAction {
  type: 'SUBMIT_START' | 'SUBMIT_SUCCESS' | 'SUBMIT_ERROR';
}

export interface IFormState {
  submitting: boolean;
  submitFailed: boolean;
  submitSucceeded: boolean;
}

const initialState: IFormState = {
  submitting: false,
  submitFailed: false,
  submitSucceeded: false,
};

function formReducer(state: IFormState, action: IFormAction): IFormState {
  switch (action.type) {
    case 'SUBMIT_START':
      return {
        ...state,
        submitting: true,
      };
    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        submitting: false,
        submitFailed: false,
        submitSucceeded: true,
      };
    case 'SUBMIT_ERROR':
      return {
        ...state,
        submitting: false,
        submitFailed: true,
        submitSucceeded: false,
      };
    default:
      return state;
  }
}

export class ZentForm<T extends UnknownFieldSetModelChildren>
  implements IForm<T> {
  /** @internal */
  submit$ = new Subject<FormEvent | undefined>();
  /** @internal */
  reset$ = new Subject<FormEvent<HTMLFormElement> | undefined>();

  /** @internal */
  constructor(
    readonly inner: IForm<T>,
    /** @internal */
    public state: IFormState,
    /** @internal */
    private dispatch: (action: IFormAction) => void
  ) {}

  /**
   * 表单是否正在提交
   */
  get isSubmitting() {
    return this.state.submitting;
  }

  /**
   * 上一次表单提交是否失败，初始为 `false`
   */
  get isSubmitFailed() {
    return this.state.submitFailed;
  }

  /**
   * 上一次表单提交是否成功，初始为 `false`
   */
  get isSubmitSucceeded() {
    return this.state.submitSucceeded;
  }

  get ctx() {
    return this.inner.ctx;
  }

  get model() {
    return this.inner.model;
  }

  /**
   * 触发表单提交操作
   * ```jsx
   *  <button onClick={form.submit}>submit</button>
   * ```
   */
  submit = (e?: React.SyntheticEvent) => {
    this.submit$.next(e);
  };

  validate(option: ValidateOption = ValidateOption.Default): Promise<any> {
    return this.inner.model.validate(option);
  }

  isValid() {
    return this.inner.model.valid();
  }

  isValidating() {
    return this.inner.model.isValidating$.getValue();
  }

  getValue() {
    return this.inner.model.getRawValue();
  }

  getSubmitValue() {
    return this.inner.model.getSubmitValue();
  }

  initialize(value: $FieldSetValue<T>) {
    this.inner.model.initialize(value);
  }

  patchValue(value: Partial<$FieldSetValue<T>>) {
    this.inner.model.patchValue(value);
  }

  resetValue() {
    this.inner.model.reset();
  }

  reset(e: FormEvent<HTMLFormElement>) {
    this.reset$.next(e);
  }

  clear() {
    this.inner.model.clear();
  }

  submitStart() {
    this.dispatch({
      type: 'SUBMIT_START',
    });
  }

  submitSuccess() {
    this.dispatch({
      type: 'SUBMIT_SUCCESS',
    });
  }

  submitError() {
    this.dispatch({
      type: 'SUBMIT_ERROR',
    });
  }
}

export function useForm<T extends UnknownFieldSetBuilderChildren>(
  arg: FormStrategy.View | FormBuilder<T>
) {
  const inner = superUseForm(arg);
  const [state, _dispatch] = useReducer(formReducer, initialState);
  const dispatch = useAsyncSafeDispatch(_dispatch);
  /**
   * Sync state in render phase to avoid creating ZentForm unnecessarily.
   */
  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  const form = useMemo(() => new ZentForm(inner, state, dispatch), [
    inner,
    dispatch,
  ]);
  form.state = state;
  return form;
}

/**
 * Subscribe value of form. Note that this hook might cause performance problem(s), use it with caution.
 * @param form Return value of `Form.useForm`
 * @param defaultValue
 */
export function useFormValue<T extends UnknownFieldSetModelChildren>(
  form: ZentForm<T>,
  defaultValue?: $FieldSetValue<T>
) {
  return useValue$(form.model.value$, defaultValue);
}

/**
 * Subscribe value of form. Note that this hook might cause performance problem(s), use it with caution.
 * @param form Return value of `Form.useForm`
 */
export function useFormValid<T extends UnknownFieldSetModelChildren>(
  form: ZentForm<T>
) {
  return useValue$(form.model.valid$, form.model.valid$.value);
}
