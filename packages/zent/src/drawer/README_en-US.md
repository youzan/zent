---
title: Drawer
path: component/drawer
group: Feedback
---

## Drawer

A panel which slides in from the edge of the screen.

### API

| 参数         | 说明                                                                                          | 类型                                   | 默认值  | 是否必填 |
| ------------ | --------------------------------------------------------------------------------------------- | -------------------------------------- | ------- | -------- |
| onClose      | Specify a callback that will be called when a user clicks mask, close button or cancel button | `e => void`                            | `noop`  | 否       |
| visible      | Whether the Drawer dialog is visible or not                                                   | `boolean`                              | `false` | 否       |
| maskClosable | Clicking on the mask (area outside the Drawer) to trigger `onClose` or not                    | `boolean`                              | `false` | 否       |
| closeOnESC   | Whether support press esc to trigger `onClose`                                                | `boolean`                              | `true`  | 否       |
| mask         | Whether to show mask or not                                                                   | `boolean`                              | `true`  | 否       |
| title        | The title for Drawer                                                                          | `ReactNode`                            | `null`  | 否       |
| footer       | Custom footer for Drawer                                                                      | `ReactNode`                            | `null`  | 否       |
| placement    | The placement of the Drawer                                                                   | `top` \| `right` \| `bottom` \| `left` | `right` | 否       |
| width        | Placement is left or right, width of the Drawer dialog                                        | `string` \| `number`                   | `45%`   | 否       |
| height       | Placement is top or bottom, height of the Drawer dialog                                       | `string` \| `number`                   | `45%`   | 否       |
| className    | The class name of the container of the Drawer dialog                                          | `string`                               | `''`    | 否       |
| closeBtn     | Custom close btn, setting `false` will hide `closebtn`                                        | `ReactNode`                            | `true`  | 否       |
