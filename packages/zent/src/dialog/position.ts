export const enum DialogPosition {
  auto = 'auto',
  center = 'center',
}

export type IDialogPositionType = keyof typeof DialogPosition;

/**
 * 根据传入的 position 参数，计算出弹窗的 transformOrigin 属性值
 * @param position 弹窗位置，可选值为auto、center
 * @param el 弹窗元素
 * @returns 返回 transformOrigin 属性值
 */
export const getPositionTransformOrigin = (
  position?: IDialogPositionType,
  _el?: HTMLDivElement // 后续增加其他位置信息，需要使用 el 计算位置
) => {
  switch (position) {
    case DialogPosition.center:
      return 'center center 0';
    case DialogPosition.auto:
    default:
      return undefined;
  }
};
