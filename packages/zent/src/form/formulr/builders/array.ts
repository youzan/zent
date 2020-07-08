import { BasicBuilder } from './basic';
import { FieldArrayModel } from '../models';
import { Maybe, or } from '../maybe';

export class FieldArrayBuilder<
  ChildBuilder extends BasicBuilder<any, any>
> extends BasicBuilder<
  readonly (ChildBuilder['phantomValue'] | null)[],
  FieldArrayModel<ChildBuilder['phantomValue'], ChildBuilder['phantomModel']>
> {
  private _defaultValue: ReadonlyArray<ChildBuilder['phantomValue']> = [];

  constructor(private readonly childBuilder: ChildBuilder) {
    super();
  }

  defaultValue(defaultValue: ReadonlyArray<ChildBuilder['phantomValue']>) {
    this._defaultValue = defaultValue;
    return this;
  }

  build(
    defaultValue?: Maybe<ReadonlyArray<ChildBuilder['phantomValue'] | null>>
  ): FieldArrayModel<
    ChildBuilder['phantomValue'],
    ChildBuilder['phantomModel']
  > {
    const model = new FieldArrayModel<
      ChildBuilder['phantomValue'],
      ChildBuilder['phantomModel']
    >(
      this.childBuilder,
      or(defaultValue, () => this._defaultValue)
    );
    model.validators = this._validators;
    return model;
  }
}
