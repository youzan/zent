/**
 * 判断 MayebDerive 和 Base 是不是同一个类型。
 * @param {Function} MaybeDerive 子类
 * @param {Function} Base 基类
 */
export default function kindOf(MaybeDerive, Base) {
  return MaybeDerive === Base || MaybeDerive.prototype instanceof Base;
}
