/// <reference types="react" />

declare module 'zent/lib/notify' {
  interface INotifyProps {
    text?: any;
    duration?: number;
    callback?: () => void;
  }

  export default class Notify extends React.Component<INotifyProps, any> {
    static success(
      text: React.ReactNode,
      duration?: number,
      callback?: () => void
    ): number;
    static error(
      text: React.ReactNode,
      duration?: number,
      callback?: () => void
    ): number;
    static config(options: { duration: number }): void;
    static clear(id: number): void;
  }
}
