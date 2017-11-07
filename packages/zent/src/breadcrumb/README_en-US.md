---
title: Breadcrumb
path: component/breadcrumb
group: Navigation
---

## Breadcrumb

Breadcrumb is used to provide a hierarchical navigation structure and mark the current position.

### Guide

-   There're more than 2 levels of hierarchy。
-   Users need to be told where they are.
-   Function of navigating upwards is required.

### API

#### Breadcrumb

| Property    |   Description          | Type     | Default        |
| --------- | ------------- | ------ | ---------- |
| breads      | data  | array | `[]`   |
| className | extra custom class name  | string | `''`       |
| prefix    | custom prefix    | string | `'zent'`   |

#### Item

| Property        | Description      | Type                      | Default  |
| --------- | ------- | ----------------------- | ---- |
| className | extra custom class name | string                  | `''` |
| name      | content      | string or React node |  -    |
| href      | hyperlink      | string                  |   -   |
