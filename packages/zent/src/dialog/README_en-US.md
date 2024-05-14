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

| Props           | Description                                              | Type              | Default |
| --------------- | -------------------------------------------------------- | ----------------- | ------- |
| title           | Dialog title                                             | `ReactNode`       | `''`    |
| children        | Content of the dialog`                                   | `ReactNode`       | `null`  |
| footer          | Content of the dialog footer                             | `ReactNode`       | `null`  |
| visible         | Visibility of the dialog                                 | `boolean`         | `false` |
| closeBtn        | Visibility of the close button at the upper right corner | `boolean`         | `true`  |
| onClose         | Close callback                                           | `(event) => void` | `noop`  |
| onClosed        | Callback when dialog closing animation is done           | `() => void`      |         |
| onOpened        | Callback when dialog opening animation is done           | `() => void`      |         |
| mask            | Visibility of the mask                                   | `boolean`         | `true`  |
| maskClosable    | Click on the mask to close the dialog                    | `boolean`         | `true`  |
| className       | Custom classname                                         | `string`          | `''`    |
| style           | Custom style object                                      | `CSSProperties`   | `{}`    |
| closeOnESC      | Close portal when pressing ESC                           | `bool`            | `true`  |
| blockPageScroll | Block page scroll when portal is open                    | `bool`            | `true`  |


#### openDialog

`openDialog(options: Partial<IOpenDialogOption>): () => void`

**`options` can contain all props above in addition to `visible` as well as the following parameters：** 

| parameter           | description                            | Type     | Default      |
| ------------ | ----------------------------- | ------ | -------- |
| dialogId   | Optional, the id of dialog. The dialog can be closed throuth `closeDialog(dialogId)`.  | string | `'random-id'` |
| parentComponent |  Optional, the reference of dialog's parent, used to correlate the `context` | ReactInstance  |     |

A `ref` function passed to `openDialog` can provide a reference to the instance, **`ref` in string format is non-supported.**

> The return value of `openDialog` is a function which can close the dialog manually, and close the dialog with this function won't trigger `onClose`.


#### closeDialog

`closeDialog(dialogId: string, options: object): void`

If `options.triggerOnClose` is `true`, `onClose` will be triggered when the dialog is closed.


#### Specify the width of the Dialog

Set a `style` prop on Dialog can specify its width, e.g. `style={{ width: '600px' }}`.

By default the pop-up window width will adapt its content, meanwhile it has a minimum width and maximum width.

#### Specify Dialog Transform Origin

Set a `style` prop on Dialog can specify the transform origin, e.g. `style={{ transformOrigin: '10% 10%' }}`.

By default, the transform origin of the pop-up window is the mouse position that triggers the opening of the dialog.
