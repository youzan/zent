---
title: CopyButton
path: component/copy-btn
group: Data Entry
---

## CopyButton

Copy button will copy the specified text to the system clipboard when clicked.

### Guides

- When you need to copy some text, you can use this component.
- This component may fail in some older version browsers since it doesn't rely on Flash.

### API

| Property     |  Description  | Type     | Default  | Alternative |
| ------------ | ----------------------------- | ------ | -------- |
| text        | The next need to be copied | text   |     |
| onCopySuccess | The callback function that is triggered when copy successful. If this property is string, it will show in `Notify.info`. | function \| string  | `'Copied'` |
| onCopyError   | The callback function that is triggered when copy failed. If this property is string, it will show in `Notify.error`.  | function \| string  | `'Copy failed'` |

