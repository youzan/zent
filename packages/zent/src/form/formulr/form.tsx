import { useMemo } from 'react';
import { FormStrategy, FormModel, BasicModel } from './models';
import { IFormContext } from './context';
import { FormBuilder, $FieldSetBuilderChildren } from './builders';
import { BasicBuilder } from './builders/basic';

export interface IForm<T extends Record<string, BasicModel<unknown>>> {
  ctx: IFormContext;
  model: FormModel<T>;
}

/**
 * 创建一个 `Form`
 *
 * @param arg 指定一个 builder 对象来显式构造表单数据，或者指定 `FormStrategy.View` 自动根据视图构造表单数据
 */
export function useForm<
  T extends Record<string, Builder>,
  Builder extends BasicBuilder<unknown, Model>,
  Model extends BasicModel<unknown>
>(
  arg: FormStrategy.View | FormBuilder<T, Builder, Model>
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
