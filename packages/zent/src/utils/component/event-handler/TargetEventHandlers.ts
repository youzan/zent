import { eventOptionsKey } from './event-option-key';

interface IEventHandlers {
  handlers: EventListener[];
  handleEvent: EventListener;
  nextHandlers?: EventListener[];
}

type EventsMap<E extends string = string> = Record<E, IEventHandlers>;

export class TargetEventHandlers<E extends string = string> {
  target: EventTarget;
  events: EventsMap<E>;

  constructor(target: EventTarget) {
    this.target = target;
    this.events = {} as EventsMap<E>;
  }

  add(
    eventName: E,
    listener: EventListener,
    options?: boolean | AddEventListenerOptions
  ) {
    // options has already been normalized at this point.
    const eventHandlers = this.getEventHandlers(eventName, options);

    ensureCanMutateNextEventHandlers(eventHandlers);

    const { nextHandlers } = eventHandlers;

    if (nextHandlers.length === 0) {
      eventHandlers.handleEvent = this.handleEvent.bind(
        this,
        eventName,
        options
      );

      const { target } = this;
      // eslint-disable-next-line ban/ban
      target.addEventListener(eventName, eventHandlers.handleEvent, options);
    }

    if (nextHandlers.indexOf(listener) === -1) {
      nextHandlers.push(listener);
    }

    let isSubscribed = true;
    const unsubscribe = () => {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextEventHandlers(eventHandlers);
      const { nextHandlers } = eventHandlers;
      const index = nextHandlers.indexOf(listener);
      nextHandlers.splice(index, 1);

      if (nextHandlers.length === 0) {
        // All event handlers have been removed, so we want to remove the event
        // listener from the target node.
        const { target } = this;
        if (target) {
          // There can be a race condition where the target may no longer exist
          // when this function is called, e.g. when a React component is
          // unmounting. Guarding against this prevents the following error:
          //
          //   Cannot read property 'removeEventListener' of undefined
          // eslint-disable-next-line ban/ban
          target.removeEventListener(
            eventName,
            eventHandlers.handleEvent,
            options
          );
        }

        eventHandlers.handleEvent = undefined;
      }
    };
    return unsubscribe;
  }

  private getEventHandlers(
    eventName: E,
    options: boolean | AddEventListenerOptions
  ): IEventHandlers {
    const key = `${eventName} ${eventOptionsKey(options)}`;

    if (!this.events[key]) {
      this.events[key] = {
        handlers: [],
        handleEvent: undefined,
      };
      this.events[key].nextHandlers = this.events[key].handlers;
    }

    return this.events[key];
  }

  private handleEvent(
    eventName: E,
    options: boolean | AddEventListenerOptions,
    event: Event
  ) {
    const eventHandlers = this.getEventHandlers(eventName, options);
    eventHandlers.handlers = eventHandlers.nextHandlers;
    eventHandlers.handlers.forEach(handler => {
      handler(event);
    });
  }
}

function ensureCanMutateNextEventHandlers(eventHandlers: IEventHandlers) {
  if (eventHandlers.handlers === eventHandlers.nextHandlers) {
    eventHandlers.nextHandlers = eventHandlers.handlers.slice();
  }
}
