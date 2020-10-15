import { useMemo } from 'react';
import { FormStrategy, FormModel } from './models';
import { IFormContext } from './context';
import { FormBuilder, $FieldSetBuilderChildren } from './builders';
import {
  UnknownFieldSetModelChildren,
  UnknownFieldSetBuilderChildren,
} from './utils';

export interface IForm<T extends UnknownFieldSetModelChildren> {
  ctx: IFormContext;
  model: FormModel<T>;
}

/**
 * 创建一个 `Form`
 *
 * @param arg 指定一个 builder 对象来显式构造表单数据，或者指定 `FormStrategy.View` 自动根据视图构造表单数据
 */
export function useForm<T extends UnknownFieldSetBuilderChildren>(
  arg: FormStrategy.View | FormBuilder<T>
): IForm<$FieldSetBuilderChildren<T>> {
  return useMemo(() => {
    let strategy: FormStrategy;
    let model: FormModel<any>;
    if (arg === FormStrategy.View) {
      strategy = arg;
      model = new FormModel({});
    } else {
      strategy = FormStrategy.Model;
      model = arg.build();
    }
    const ctx = {
      strategy,
      form: model,
      parent: model,
    };
    return {
      ctx,
      model,
    };
  }, [arg]);
}
