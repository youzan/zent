export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

export type DrawerCloseFuncType = (
  e:
    | React.MouseEvent<HTMLSpanElement, MouseEvent>
    | MouseEvent
    | KeyboardEvent
    | TouchEvent
    | Event
) => void;

export interface IDrawerBackdrop {
  mask: boolean;
  visible: boolean;
  maskClosable: boolean;
  onClose: DrawerCloseFuncType;
}

export interface IDrawerContent {
  onClose: DrawerCloseFuncType;
  visible: boolean;
  mask: boolean;
  title: React.ReactNode;
  footer: React.ReactNode;
  onExited: (node: HTMLElement) => void;
  onEntered: (node: HTMLElement) => void;
  placement: DrawerPlacement;
  width: string | number;
  height: string | number;
  closeBtn: React.ReactNode;
}

export interface IDrawerProps {
  onClose?: DrawerCloseFuncType; // 关闭drawer的回调
  className?: string; // 对话框外层容器的类名
  visible?: boolean; // Drawer是否可见
  maskClosable?: boolean; // 点击遮罩触发onClose
  closeOnESC?: boolean; // 按下 ESC 键时触发onClose
  mask?: boolean; // 是否显示遮罩
  title?: React.ReactNode; // 自定义头部内容
  footer?: React.ReactNode; // 自定义底部内容
  placement?: DrawerPlacement;
  width?: string | number;
  height?: string | number;
  closeBtn?: React.ReactNode;
}
