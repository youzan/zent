---
title: Breadcrumb
path: component/breadcrumb
group: Navigation
---

## Breadcrumb

Displays the position of the current page in the system hierarchy. It can be redirected and is only one line high.

### Suggestion

- There're more than 2 levels of hierarchy。
- Users need to be told where they are.
- Function of navigating upwards is required.

### Note

- No more than one line of Breadcrumbs is allowed
- Do not use Breadcrumbs directly to describe the operation path

### API

#### Breadcrumb

| Property     | Description                           | Type   | Default |
| ------------ | ------------------------------------- | ------ | ------- |
| breads       | data                                  | array  | `[]`    |
| className    | extra custom class name               | string | `''`    |
| maxItemCount | exceeds the number of automatic folds |

#### Item

| Property  | Description             | Type                 | Default |
| --------- | ----------------------- | -------------------- | ------- |
| className | extra custom class name | string               | `''`    |
| name      | content                 | string or React node | -       |
| href      | hyperlink               | string               | -       |
