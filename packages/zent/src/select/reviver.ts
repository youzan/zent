import isPlainObject from '../utils/isPlainObject';
import isEqual from '../utils/isEqual';
import { ISelectItem } from './Select';
import uniqueId from '../utils/uniqueId';

export function reviveSelectItem<K extends string | number = string | number>(
  reviver:
    | K
    | {
        key: K;
        [k: string]: unknown;
      }
    | ISelectItem<K>['reviver']
): ISelectItem<K> {
  let reviverFn: ISelectItem<K>['reviver'];

  if (typeof reviver === 'function') {
    reviverFn = reviver;
  } else if (isPlainObject(reviver)) {
    reviverFn = item =>
      Object.keys(reviver).every(k => isEqual(reviver[k], (item as any)[k]))
        ? item
        : null;
  } else {
    reviverFn = item => (item.key === reviver ? item : null);
  }

  return {
    key: uniqueId('select-item-reviver-'),
    text: null,
    type: 'reviver',
    reviver: reviverFn,
  } as ISelectItem<K>;
}

export function filterReviver<
  Key extends string | number = string | number,
  Item extends ISelectItem<Key> = ISelectItem<Key>
>(value: Item[] | Item | null) {
  if (Array.isArray(value)) {
    let found = false;
    const val: Item[] = [];

    for (const v of value) {
      if (v.type === 'reviver') {
        found = true;
      } else {
        val.push(v);
      }
    }

    return found ? val : value;
  }

  if (value) {
    return value.type === 'reviver' ? null : value;
  }

  return value;
}
