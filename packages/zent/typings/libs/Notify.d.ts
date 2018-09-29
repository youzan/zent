/// <reference types="react" />

declare module 'zent/lib/notify' {

  namespace Notify {

    export interface IProps {
      text?: any
      duration?: number
      callback?: () => void
    }

  }

  class Notify extends React.Component<Notify.IProps, any> {
    static success(text: React.ReactNode, duration?: number, callback?: () => void): number
    static error(text: React.ReactNode, duration?: number, callback?: () => void): number
    static config(options: { duration: number }): void
    static clear(id: number): void
  }

  export default Notify;
}
