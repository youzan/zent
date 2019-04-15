import * as React from 'react';
import { BasicModel, IMaybeError, FormContext, IFormContext } from 'formulr';
import { Subscription, combineLatest, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormError } from './Error';

function equal<T>(a: T[], b: T[]) {
  if (a === b) {
    return true;
  }
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

function pickError(errors: Array<IMaybeError<unknown>>): IMaybeError<unknown> {
  for (let i = 0; i < errors.length; i += 1) {
    const error = errors[i];
    if (error) {
      return error;
    }
  }
  return null;
}

export interface ICombineErrorsProps {
  names?: string[];
  models?: Array<BasicModel<any>>;
  children?: (error: IMaybeError<any>) => React.ReactNode;
}

export interface ICombineErrorState {
  error: IMaybeError<any>;
}

export class CombineErrors extends React.Component<
  ICombineErrorsProps,
  ICombineErrorState
> {
  static contextType = FormContext;
  context!: IFormContext;

  private $: Subscription | null = null;
  private $parent: Subscription | null = null;

  state: ICombineErrorState = {
    error: null,
  };

  private parentChildrenChange = (name: string) => {
    const { names } = this.props;
    if (!names || !names.includes(name)) {
      return;
    }
    this.unsubscribe();
    this.subscribe();
  };

  setError = (error: IMaybeError<unknown>) => {
    this.setState({
      error,
    });
  };

  subscribe() {
    const { parent } = this.context;
    const { models, names } = this.props;
    const fields: Array<BasicModel<unknown>> = [];
    if (names) {
      for (let i = 0; i < names.length; i += 1) {
        const name = names[i];
        const model = parent.get(name);
        if (model) {
          fields.push(model);
        }
      }
    }
    if (models) {
      for (let i = 0; i < models.length; i += 1) {
        fields.push(models[i]);
      }
    }
    this.$ = combineLatest(fields.map(it => it.error$))
      .pipe(map(pickError))
      .subscribe(this.setError);
  }

  unsubscribe() {
    if (this.$) {
      this.$.unsubscribe();
      this.$ = null;
    }
  }

  shouldComponentUpdate(
    nextProps: ICombineErrorsProps,
    nextState: ICombineErrorState
  ) {
    return nextProps !== this.props || nextState.error !== this.state.error;
  }

  componentDidMount() {
    const { parent } = this.context;
    this.subscribe();
    this.$parent = merge(parent.childRegister$, parent.childRemove$).subscribe(
      this.parentChildrenChange
    );
  }

  componentDidUpdate(prevProps: ICombineErrorsProps) {
    if (this.props !== prevProps) {
      if (
        !equal(prevProps.models || [], this.props.models || []) ||
        !equal(prevProps.names || [], this.props.names || [])
      ) {
        this.unsubscribe();
        this.subscribe();
      }
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
    if (this.$parent) {
      this.$parent.unsubscribe();
      this.$parent = null;
    }
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;
    if (children) {
      return children(error);
    }
    if (error === null) {
      return null;
    }
    return <FormError>{error.message}</FormError>;
  }
}
