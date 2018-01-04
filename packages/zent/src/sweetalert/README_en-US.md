---
title: Sweetalert
path: component/sweetalert
group: Feedback
---

## Sweetalert

Sweetalert is a function used for arouse a Dialog rapidly.

### Guides

-  Sweetalert has no custom option, use Dialog instead if needed.

### API

#### Sweetalert.alert

| Props | Description | Type | Default | Alternatives |
| --- | ---- | --- | --- | --- |
| content     | main content of the dialog                              | node   |        |                                               |
| type        | dialog type, will show an icon on the left side of title if this prop is set. | string |    `''`    | `'info'`, `'success'`, `'error'`, `'warning'` |
| title       | title of the dialog | node   | `''`     |                                               |
| onConfirm   | callback of confirm operation | func   | `noop`   |                                               |
| confirmText | text of confirm button | string | `'OK'`   |                                               |
| confirmType | type of confirm button | string | `'primary'` | `'default'`、`'primary'`、`'danger'`、`'success'` |
| closeBtn     | visibility of the close button at the upper right corner | bool   | `false`   |
| maskClosable | wether click on the mask is to close the dialog | bool   | `true`   |
| parentComponent | Parent component instance，i18n needs this to pass context through | ReactInstance | | |
| className   | custom classname                       | string | `''`     |                                               |
| prefix      | custom prefix  | string | `'zent'`|     |

#### Sweetalert.confirm

| Props          | Description                                      | Type     | Default      | Alternatives                                           |
| ----------- | --------------------------------------- | ------ | -------- | --------------------------------------------- |
| content     | main content of the dialog                              | node   |       |                                               |
| type        | dialog type, will show an icon on the left side of title if this prop is set. | string |   `''`   | `'info'`, `'success'`, `'error'`, `'warning'` |
| title       | title of the dialog                               | node   | `''`     |                                               |
| onCancel    | callback of cancel operation                            | func   | `noop`   |                                               |
| onConfirm   | callback of confirm operation                            | func   | `noop`   |                                               |
| cancelText  | text of cancel button                              | string | `'Cancel'`   |                                               |
| confirmText | text of confirm button   | string | `'Confirm'`   |                                               |
| confirmType | type of confirm button  | string | `'primary'` | `'default'`、`'primary'`、`'danger'`、`'success'` |
| closeBtn     | visibility of the close button at the upper right corner | bool   | `false`   |
| maskClosable | wether click on the mask is to close the dialog | bool   | `true`   |
| className   | custom classname | string | `''`     |                                               |
| prefix      | custom prefix                      | string | `'zent'` |                                               |

- The returned value of `Sweetalert.alert` and `Sweetalert.confirm` are functions which can be used to close the dialog manually.
- If `onConfirm` return a `Promise`, the corresponding button will stay loading when `Promise` is pending; The dialog won't be closed when `Promise` rejected, and will be closed if `Promise` resolved.
- If `onConfirm` has no parameter and returned a `false`, the dialog won't be closed.
- If `onConfirm` has one parameter `close`, it need to be triggered manually to close the dialog.
