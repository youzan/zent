declare module 'scheduler' {
  export type FrameCallbackType = () => FrameCallbackType | void;
  export interface CallbackNode {
    callback: FrameCallbackType;
    priorityLevel: number;
    expirationTime: number;
    next: CallbackNode | null;
    prev: CallbackNode | null;
  }

  export interface IScheduleCallbackOptions {
    delay?: number;
  }

  export const unstable_ImmediatePriority: number;
  export const unstable_UserBlockingPriority: number;
  export const unstable_NormalPriority: number;
  export const unstable_IdlePriority: number;
  export const unstable_LowPriority: number;
  export function unstable_runWithPriority<T>(priorityLevel: number, eventHandler: () => T): T | undefined;
  export function unstable_scheduleCallback(priorityLevel: number, callback: FrameCallbackType, options?: IScheduleCallbackOptions): CallbackNode;
  export function unstable_cancelCallback(callbackNode: CallbackNode): void;
  export function unstable_wrapCallback(callback: FrameCallbackType): () => FrameCallbackType | undefined;
  export function unstable_getCurrentPriorityLevel(): number;
  export function unstable_shouldYield(): boolean;
  export function unstable_continueExecution(): void;
  export function unstable_pauseExecution(): void;
  export function unstable_getFirstCallbackNode(): CallbackNode | null;
  export function unstable_now(): number;
}
