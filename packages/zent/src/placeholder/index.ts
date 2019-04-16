export * from './shapes/TextRow';
export * from './shapes/TextRowDashed';
export * from './shapes/Circle';
export * from './shapes/Rectangle';
export * from './presets/TextBlock';
export * from './presets/RichTextBlock';

import TextRow from './shapes/TextRow';
import TextRowDashed from './shapes/TextRowDashed';
import Circle from './shapes/Circle';
import Rectangle from './shapes/Rectangle';
import TextBlock from './presets/TextBlock';
import RichTextBlock from './presets/RichTextBlock';

export const Placeholder = {
  // 基础构建组件
  TextRow,
  TextRowDashed,
  Circle,
  Rectangle,

  // 预定义的模版
  TextBlock,
  RichTextBlock,
};

export default Placeholder;
