export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

export interface IDrawerBackdrop {
  mask: boolean;
  visible: boolean;
  maskClosable: boolean;
  onClose: () => void;
}

export interface IDrawerContent {
  onClose: () => void;
  visible: boolean;
  mask: boolean;
  title: React.ReactNode;
  footer: React.ReactNode;
  onEntered: (node: HTMLElement) => void;
  onExit: (node: HTMLElement) => void;
  onExited: (node: HTMLElement) => void;
  placement: DrawerPlacement;
  closeBtn: React.ReactNode;
  width?: string | number;
  height?: string | number;
}

interface IDrawerProps {
  onClose?: () => void; // 关闭drawer的回调
  className?: string; // 对话框外层容器的类名
  visible?: boolean; // Drawer是否可见
  maskClosable?: boolean; // 点击遮罩触发onClose
  closeOnESC?: boolean; // 按下 ESC 键时触发onClose
  mask?: boolean; // 是否显示遮罩
  title?: React.ReactNode; // 自定义头部内容
  footer?: React.ReactNode; // 自定义底部内容
  placement?: DrawerPlacement; // Drawer 的显示方向
  closeBtn?: React.ReactNode; // 自定义关闭按钮
}

export type DrawerPropsType = (
  | {
      width?: string | number;
    }
  | {
      height?: string | number;
    }
) &
  IDrawerProps;
