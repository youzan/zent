---
title: EventHandler
subtitle: 事件监听
path: component/event-handler
group: 基础
---

## EventHandler

- 提供浏览器事件监听能力，API 形式包括传统的函数、Hooks 以及 React 组件形式。
- 相同的事件做了合并，减少浏览器的事件回调数量。
- 适用于一些需要动态监听事件的场景，以及一些全局事件的监听。
- 推荐使用 React 原生的事件监听能力，只有当无法满足需求时才考虑这个组件。
- 为 `window` 对象事件的监听做了专门封装。

### API

提供了几种不同的事件注册方式。

#### `addEventListener` 函数

这是最基础的使用方式，和框架无关，类似原生的 `addEventListener` 函数。

返回值是一个取消事件监听的函数，所以不存在 `removeEventListener` 这个函数。

```ts
function addEventListener<T extends EventTarget = HTMLElement>(
	target: T,
	eventName: string,
	listener: EventListener,
	options?: AddEventListenerOptions
): () => void;
```

#### `useEventHandler` Hook

Hooks 的封装，无需关心事件的解绑，会自动处理；适合事件监听的生命周期和组件生命周期一致的场景。

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

#### `EventHandler` 组件

React 组件形式的封装，同 Hooks 一样无需关心事件的解绑，组件会自动处理；适合事件监听的生命周期和组件生命周期一致的场景。

| 参数      | 说明               | 类型                      | 是否必填 | 默认值                                          | 备选值 |
| --------- | ------------------ | ------------------------- | -------- | ----------------------------------------------- | ------ |
| target    | 挂载事件的目标节点 | `EventTarget`             | 是       |                                                 |        |
| eventName | 要监听的事件名称   | `string`                  | 是       |                                                 |        |
| listener  | 事件回调函数       | `function`                | 是       |                                                 |        |
| options   | 事件参数配置       | `AddEventListenerOptions` | 否       | `{once: false, capture: false, passive: false}` |        |

除了上述三种通用的事件挂载形式外，还提供了 `window` 对象上常用事件的挂载组件，方便使用。

#### WindowEventHandler 组件

| 参数      | 说明             | 类型                              | 是否必填 | 默认值                                            | 备选值 |
| --------- | ---------------- | --------------------------------- | -------- | ------------------------------------------------- | ------ |
| eventName | 要监听的事件名称 | `keyof WindowEventMap`            | 是       |                                                   |        |
| listener  | 事件回调函数     | `(ev: WindowEventMap[K]) => void` | 是       |                                                   |        |
| options   | 事件参数配置     | `AddEventListenerOptions`         | 否       | `{ once: false, capture: false, passive: false }` |        |

#### WindowResizeHandler 组件

组件内部已经对 `onResize` 回调做了截流处理，每一个浏览器渲染帧内最多只会触发一次。

| 参数     | 说明                     | 类型                                                     | 是否必填 | 默认值 | 备选值 |
| -------- | ------------------------ | -------------------------------------------------------- | -------- | ------ | ------ |
| onResize | 窗口大小改变后的回调函数 | `(e: UIEvent, delta: IWindowResizeHandlerDelta) => void` | 是       |        |        |

#### WindowScrollHandler 组件

组件内部已经对 `onScroll` 回调做了截流处理，每一个浏览器渲染帧内最多只会触发一次。

| 参数     | 说明                         | 类型                       | 是否必填                                         | 默认值 | 备选值 |
| -------- | ---------------------------- | -------------------------- | ------------------------------------------------ | ------ | ------ |
| onScroll | 窗口内容区域滚动后的回调函数 | `(event: UIEvent) => void` | 是                                               |        |        |
| options  | 滚动事件的参数               | `AddEventListenerOptions`  | `{ once: false, capture: false, passive: true }` |        |        |
