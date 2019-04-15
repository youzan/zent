import { useMemo, useReducer, FormEvent } from 'react';
import {
  IForm,
  ValidateOption,
  $FieldSetValue,
  useForm as superUseForm,
  FormStrategy,
  FormBuilder,
  BasicModel,
  BasicBuilder,
} from 'formulr';
import { Subject } from 'rxjs';

export interface IFormAction {
  type: 'SUBMIT_START' | 'SUBMIT_SUCCESS' | 'SUBMIT_ERROR';
}

export interface IFormState {
  submitting: boolean;
}

const initialState: IFormState = {
  submitting: false,
};

function formReducer(state: IFormState, action: IFormAction): IFormState {
  switch (action.type) {
    case 'SUBMIT_START':
      return {
        ...state,
        submitting: true,
      };
    case 'SUBMIT_SUCCESS':
    case 'SUBMIT_ERROR':
      return {
        ...state,
        submitting: false,
      };
    default:
      return state;
  }
}

export class ZentForm<T extends Record<string, BasicModel<unknown>>>
  implements IForm<T> {
  /** @internal */
  submit$ = new Subject<FormEvent | undefined>();

  /** @internal */
  constructor(
    readonly inner: IForm<T>,
    /** @internal */
    public state: IFormState,
    /** @internal */
    private dispatch: (action: IFormAction) => void
  ) {}

  get isSubmitting() {
    return this.state.submitting;
  }

  get ctx() {
    return this.inner.ctx;
  }

  get model() {
    return this.inner.model;
  }

  /**
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

  initialize(value: $FieldSetValue<T>) {
    this.inner.model.initialize(value);
  }

  patchValue(value: $FieldSetValue<T>) {
    this.inner.model.patchValue(value);
  }

  resetValue() {
    this.inner.model.reset();
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

  submitError(error: any) {
    this.dispatch({
      type: 'SUBMIT_ERROR',
    });
  }
}

export function useForm<
  T extends Record<string, BasicBuilder<unknown, BasicModel<unknown>>>
>(arg: FormStrategy.View | FormBuilder<T>) {
  const inner = superUseForm(arg);
  const [state, dispatch] = useReducer(formReducer, initialState);
  const form = useMemo(() => new ZentForm(inner, state, dispatch), [inner]);
  form.state = state;
  return form;
}
