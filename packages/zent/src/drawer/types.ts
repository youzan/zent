export interface IDrawerBackdrop {
  mask: boolean;
  visible: boolean;
  maskClosable: boolean;
  onClose: DrawerCloseFuncType;
}

export type DrawerCloseFuncType = (
  e:
    | React.MouseEvent<HTMLSpanElement, MouseEvent>
    | MouseEvent
    | KeyboardEvent
    | TouchEvent
    | Event
) => void;

export interface IDrawerProps {
  onClose: DrawerCloseFuncType; // 点击遮罩层或右上角叉的回调
  className: string; // 对话框外层容器的类名
  visible: boolean; // Drawer是否可见
  maskClosable: boolean; // 点击遮罩触发onClose
  closeOnESC?: boolean; // 按下 ESC 键时触发onClose
  mask: boolean; // 是否显示遮罩
  title: React.ReactNode; // 自定义弹框标题
  footer: React.ReactNode;
}

export interface IDrawerContent {
  onClose: DrawerCloseFuncType;
  visible: boolean;
  className: string;
  mask: boolean;
  title: React.ReactNode;
  footer: React.ReactNode;
  onExited: (node: HTMLElement) => void;
  onEntered: (node: HTMLElement) => void;
}
