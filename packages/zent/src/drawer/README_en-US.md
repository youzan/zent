---
title: Drawer
path: component/drawer
group: Feedback
scatter: true
---

## Drawer

The modal panel that slides out on the right side of the screen; Used to carry a large volume of details or form content.

### Suggestion

- The drawer can be used when the temporary window information evoked by the operation is large and high scalability of vertical information is required.

### Note

- Do not use a single button in the drawer;
- Do not use more than two main action buttons in the drawer;

### Demos

<!-- demo-slot-1 -->
<!-- demo-slot-3 -->

### API

| 参数         | 说明                                                                                          | 类型                                   | 默认值    | 是否必填 |
| ------------ | --------------------------------------------------------------------------------------------- | -------------------------------------- | --------- | -------- |
| onClose      | Specify a callback that will be called when a user clicks mask, close button or cancel button | `e => void`                            | `noop`    | 否       |
| visible      | Whether the Drawer dialog is visible or not                                                   | `boolean`                              | `false`   | 否       |
| maskClosable | Clicking on the mask (area outside the Drawer) to trigger `onClose` or not                    | `boolean`                              | `false`   | 否       |
| closeOnESC   | Whether support press esc to trigger `onClose`                                                | `boolean`                              | `true`    | 否       |
| mask         | Whether to show mask or not                                                                   | `boolean`                              | `true`    | 否       |
| title        | The title for Drawer                                                                          | `ReactNode`                            | `null`    | 否       |
| footer       | Custom footer for Drawer                                                                      | `ReactNode`                            | `null`    | 否       |
| placement    | The placement of the Drawer                                                                   | `top` \| `right` \| `bottom` \| `left` | `right`   | 否       |
| width        | Placement is left or right, width of the Drawer dialog                                        | `string` \| `number`                   | `45%`     | 否       |
| height       | Placement is top or bottom, height of the Drawer dialog                                       | `string` \| `number`                   | `45%`     | 否       |
| className    | The class name of the container of the Drawer dialog                                          | `string`                               | `''`      | 否       |
| closeBtn     | Custom close btn, setting `false` will hide `closebtn`                                        | `ReactNode`                            | `true`    | 否       |
| size         | presetted size of drawer, default 728px and small 364px                                       | `'default'`\|`'small'`                 | `default` | false    |

#### The following functions is obsolete in the new design system and is only used as a reference for the old version

<!-- demo-slot-2 -->
<!-- demo-slot-4 -->
