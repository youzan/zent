---
title: Dialog
path: component/dialog
group: Feedback
---

## Dialog

Dialog is used for opening a floating layer.

### Guides

-  Imperative, call `openDialog` function.

-  Component-based, show/hide the dialog  through `visible` prop.

### API

| Props           | Description                            | Type     | Default      |
| ------------ | ----------------------------- | ------ | -------- |
| title        | custom dialog title                       | node   | `''`     |
| children     | content of the dialog: `<Dialog>xxxx</Dialog>` | node   | `null`   |
| footer       | content of the dialog footer                          | node   | `null`   |
| visible      | visibility of the dialog                     | bool   | `false`  |
| closeBtn     | visibility of the close button at the upper right corner | bool   | `true`   |
| onClose      | close callback                      | func   | `noop`   |
| mask         | visibility of the mask | bool   | `true`   |
| maskClosable | wether click on the mask is to close the dialog | bool   | `true`   |
| className    | custom classname                       | string | `''`     |
| prefix       | custom prefix                   | string | `'zent'` |
| style        | custom style object                 | object | `{}`     |


#### openDialog

`openDialog(options: object): function`

**`options` can contain all props above in addition to `visible` as well as the following parameters：** 

| parameter           | description                            | Type     | Default      |
| ------------ | ----------------------------- | ------ | -------- |
| dialogId   | Optional, the id of dialog. The dialog can be closed throuth `closeDialog(dialogId)`.  | string | `'random-id'` |
| parentComponent |  Optional, the reference of dialog's parent, used to correlate the `context` | ReactInstance  |     |

A `ref` function passed to `openDialog` can provide a reference to the instance, **`ref` in string format is non-supported.**

> The return value of `openDialog` is a function which can close the dialog manually, and close the dialog with this function won't trigger `onClose`. **It is recommended to use `closeDialog`.**


#### closeDialog

`closeDialog(dialogId: string, options: object): void`

If `options.triggerOnClose` is `true`, `onClose` will be triggered when the dialog is closed.


#### Specify the width of the Dialog

Set a `style` prop on Dialog can specify its width, e.g. `style={{ width: '600px' }}`.

By default the pop-up window width will adapt its content, meanwhile it has a minimum width and maximum width.
