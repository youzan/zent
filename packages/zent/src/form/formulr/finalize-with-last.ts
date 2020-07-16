import { Subscriber, Observable, Operator, TeardownLogic } from 'rxjs';

class FinalizeWithLastSubscriber<T> extends Subscriber<T> {
  /**
   * @param destination
   * @param callback
   * @param value default value
   */
  constructor(
    destination: Subscriber<T>,
    private readonly callback: (value: T) => void,
    private value: T
  ) {
    super(destination);
  }

  _next(value: T) {
    this.value = value;
    this.destination.next?.(value);
  }

  _complete() {
    try {
      const { callback } = this;
      callback(this.value);
    } catch (error) {
      this.destination.error?.(error);
    }
    this.destination.complete?.();
  }
}

class FinalizeWithLastOperator<T> implements Operator<T, T> {
  constructor(
    private readonly callback: (value: T) => void,
    private readonly defaultValue: T
  ) {}

  call(subscriber: Subscriber<T>, source: Observable<T>): TeardownLogic {
    return source.subscribe(
      new FinalizeWithLastSubscriber(
        subscriber,
        this.callback,
        this.defaultValue
      )
    );
  }
}

export function finalizeWithLast<T>(
  callback: (value: T) => void,
  defaultValue: T
) {
  return function finalizeWithLastOperatorFunction(
    source: Observable<T>
  ): Observable<T> {
    return source.lift(new FinalizeWithLastOperator(callback, defaultValue));
  };
}
