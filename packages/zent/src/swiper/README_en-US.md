---
title: Swiper
path: component/swiper
group: Data Display
---

## Swiper

**Original Swiper component.**A component that displays multiple pieces of content horizontally on a page in the form of a slide show.

### Suggestion

- It is used to display a group of horizontal content in a fixed area, such as pictures, videos and text.
- Rotation for left and right horizontal direction switch;
- Auto play is enabled by default, and the rotation is maintained.

### Note

- When the rotation content is a single, the indicator and switch arrow are not allowed to be displayed.

### API

**Nodes in `children` must pass `style` down to native DOM nodes.**

| Property           | Description                              | Type                                                | Default        | Optional                             |
| ------------------ | ---------------------------------------- | --------------------------------------------------- | -------------- | ------------------------------------ | --- |
| transitionDuration | switch animation duration(ms)            | number                                              | `300`          |                                      |
| autoplay           | switch automatically                     | bool                                                | `false`        | `true`                               |
| autoplayInterval   | automatic switch interval(ms)            | number                                              | `3000`         |                                      |
| dots               | wether to show the page button below     | bool \| `'round'` \| `'line'`                       | `true`         | `true`, `false`, `'round'`, `'line'` |
| dotsColor          | page button color                        | string                                              | `'black'`      | any css color value in string        |
| dotsTheme          | page button theme                        | string                                              | `'dark'`       | `light`                              |
| dotsSize           | page button size                         | string                                              | `'normal'`     | `'small'`, `'large'`                 |
| arrows             | wether to show flip button on both sides | bool \| `'hover'`                                   | `false`        | `true`, `false`, `'hover'`           |     |
| arrowsType         | flip button color                        | string                                              | `'dark'`       | `'dark'`, `'light'`                  |
| arrowsSize         | flip button size                         | `'normal'` \| `'large'`                             | `'normal'`     | `'normal'` \| `'large'`              |
| arrowsDisabled     | wether to disabled flip button           | `{ left?: bool, right?: bool }`                     | {}             |
| onChange           | switch callback                          | (current: number, prev: number): void               | `noop`         |                                      |
| renderPrevArrow    | Custom goto previous button              | `(onPrev: () => void, disabled: bool) => ReactNode` | Default button |                                      |
| renderNextArrow    | Custom goto next button                  | `(onNext: () => void, disabled: bool) => ReactNode` | Default button |                                      |
| className          | custom classname                         | string                                              | `''`           |                                      |

### Instance Methods

| Method Name | Instruction               | Parameter | Parameter Description |
| ----------- | ------------------------- | --------- | --------------------- |
| swipeTo     | manual switch the content | index     | figure index, 0 based |
| prev        | switch to the previous    |           |                       |
| next        | switch to the next        |           |                       |
