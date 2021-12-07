---
title: Elevator
path: component/elevator
group: Navigation
---

## Elevator

The content navigation tool enables you to quickly locate a specified location on a page based on the page catalog, improving information reading and operation efficiency.

### API

#### Elevator

| Property     |  Description  | Type     |  Required  |   Default  | Alternative   |
| -----------------| ---------------  | --------------------- | ---------- | ---------- | ---------- |
| getContainer     | Scrolling container    | `() => HTMLElement`    |  false         | `() => window`      |            |
| defaultActiveLink | anchor highlight    | `string`                |  false         |       |            |
| offsetTop         | Pixels to offset from top when calculating position of scroll   | `number` |  false         |       |            |
| targetOffset      | Anchor scroll offset, default as offsetTop    | `number`     |  false         |       |            |
| onChange          | Listening for anchor link change   | `(currentLink: string, previousLink: string) => void`     |  false         |       |            |

#### Elevator.Links

| Property     |  Description  | Type     |  Required  |   Default  | Alternative   |
| -----------------| ---------------  | --------------------- | ---------- | ---------- | ---------- |
| links            | Elevator target link list       | `{ link: string, title: ReactNode }[]`    |  true         |       |            |
| className        | Extra class name           | `string`                |  false         |       |            |
| style         | Style object   | `React.CSSProperties` |  false         |       |            |
| onClick      | Click event    | `(event: MouseEvent, currentLink: string) => void`     |  false         |       |            |

Consult [Affix](https://youzan.github.io/zent/zh/component/affix) to find more APIs.

#### Elevator.Anchor

| Property     |  Description  | Type     |  Required  |   Default  | Alternative   |
| -----------------| ---------------  | --------------------- | ---------- | ---------- | ---------- |
| link            | Elevator target         | `string`    |  true         |       |            |
