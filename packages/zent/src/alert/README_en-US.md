---
title: Alert
path: component/alert
group: Data Display
---

## Alert

Alert is used to provide eye-catching information.

### Guide

-  Content should be as simple as possible to make it easier to be read.
-  The number of buttons should be less than 2 in order to keep logic simple.

### API

| Property    |   Description          | Type     | Default        | Alternative            |
| --------- | ------------- | ------ | ---------- | --------------------------------- |
| type      | style of the Alert  | string | `'info'`   | `'info'`, `'warning'`, `'danger'` |
| size      | size of the Alert | string | `'normal'` | `'normal'`, `'large'`             |
| rounded   | determines whether the corners are rounded or not   | bool   | `false`    |   `true`, `false`                   |
| closable  | determines whether the Alert can be closed or not   | bool   | `false`    |    `true`, `false`                |
| onClose   | callback for close  | func   | `noop`     |                                   |
| className | custom extra class name  | string | `''`       |                                   |
| prefix    | custom prefix    | string | `'zent'`   |                                   |


<style>
.zent-alert {
	.text {
		margin-bottom: 5px;
	}
}
</style>
