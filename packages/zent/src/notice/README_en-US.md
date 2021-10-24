---
title: Notice
path: component/notice
group: Feedback
---

## Notice

### API

| Property  | Description                                         | Type                | Required | Default     | Alternative                                            |
| --------- | --------------------------------------------------- | ------------------- | -------- | ----------- | ------------------------------------------------------ |
| title     | Title                                               | string              | Yes      |             |                                                        |
| className | Custom class name                                   | string              | No       |             |                                                        |
| style     | Custom style                                        | React.CSSProperties | No       |             |                                                        |
| type      | Style type                                          | string              | No       |             | `info`, `success`,`warning`, `error`                   |
| closable  | Should show close button, won't auto close if false | boolean             | No       |             |                                                        |
| onClose   | Callback when close button clicked                  | function            | No       |             |                                                        |
| autoClose | Should close automatically by timeout               | boolean             | No       |             |                                                        |
| timeout   | Auto closing timeout                                | number              | No       |             |                                                        |
| children  | Children                                            | React.ReactNode     | No       |             |                                                        |
| position  | Position                                            | string              | No       | `top-right` | `right-top`, `right-bottom`, `left-top`, `left-bottom` |

#### `Notice.push(node: ReactNode): string`

Open a new notice. The returned `id` can be used to close this notice.

Note：The returned `id` may be not ready to use due to the asynchronous behavior of `ReactDOM.render`, `close(id)` will be
a no-op in this case.

#### `Notice.close(id: string): void`

Close the notice with `id`.
