---
title: EventHandler
path: component/event-handler
group: Basics
---

## EventHandler

- Manage browser event handlers with different APIS: functions, hooks or React components
- Multiple event handlers are consolidated
- Useful on global event handlers and dynamically attach event handlers
- Use React's native event system if you can, use this only when you're out of luck with React
- Provide dedicated components for event handlers on `window`

### API

There're several ways to start with.

#### `addEventListener` function

This is the tranditional way to manage event handlers, just like native `addEventListerner` function.

Our `addEventListener` function returns an unsubscribe function, so there's no `removeEventListener` function.

```ts
function addEventListener<T extends EventTarget = HTMLElement>(
	target: T,
	eventName: string,
	listener: EventListener,
	options?: AddEventListenerOptions
): () => void;
```

#### `useEventHandler` Hook

A hook encapsultes all the logic for add/remove event handlers, useful if the lifecycle of your event handler is the same as your component.

```ts
function useEventHandler<
	E extends Event,
	N extends string,
	T extends EventTarget = HTMLElement
>(
	target: T,
	eventName: N,
	listener: (event: E) => void,
	options?: AddEventListenerOptions
): void;
```

#### `EventHandler` component

A React component encapsulates all the logic for add/remove event handlers, just like `useEventHandler` hook but in a component way.

| Property  | Description                 | Type                      | Required | Default                                         | Alternative |
| --------- | --------------------------- | ------------------------- | -------- | ----------------------------------------------- | ----------- |
| target    | Target node to attach event | `EventTarget`             | Yes      |                                                 |             |
| eventName | Event to listen to          | `string`                  | Yes      |                                                 |             |
| listener  | Event callback              | `function`                | Yes      |                                                 |             |
| options   | Event handler options       | `AddEventListenerOptions` | No       | `{once: false, capture: false, passive: false}` |             |

There're three more components specifically designed for handling events on `window`.

#### WindowEventHandler component

| Property  | Description           | Type                              | Required | Default                                           | Alternative |
| --------- | --------------------- | --------------------------------- | -------- | ------------------------------------------------- | ----------- |
| eventName | Event to listen to    | `keyof WindowEventMap`            | Yes      |                                                   |             |
| listener  | Event callback        | `(ev: WindowEventMap[K]) => void` | Yes      |                                                   |             |
| options   | Event handler options | `AddEventListenerOptions`         | No       | `{ once: false, capture: false, passive: false }` |             |

#### WindowResizeHandler component

`onResize` callback is already throttled inside this component, it only gets called once per browser render frame.

| Property | Description                  | Type                                                     | Required | Default | Alternative |
| -------- | ---------------------------- | -------------------------------------------------------- | -------- | ------- | ----------- |
| onResize | Callback when window resizes | `(e: UIEvent, delta: IWindowResizeHandlerDelta) => void` | Yes      |         |             |

#### WindowScrollHandler component

`onScroll` callback is already throttled inside this component, it only gets called once per browser render frame.

| Property | Description                | Type                       | Required                                         | Default | Alternative |
| -------- | -------------------------- | -------------------------- | ------------------------------------------------ | ------- | ----------- |
| onScroll | Callback when page scrolls | `(event: UIEvent) => void` | Yes                                              |         |             |
| options  | Event handler options      | `AddEventListenerOptions`  | `{ once: false, capture: false, passive: true }` |         |             |
