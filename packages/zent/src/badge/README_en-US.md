---
title: Badge
path: component/badge
group: Data Display
---

## Badge

Badge normally appears in the upper right corner of the notification or avatar with eye-catching appeal, which is typically used to display the number of unread messages.

### Guides

-  Badge is used to prompt for new messages, which is placed in the upper right corner or right side of the text or icon.
-  Badge can display the specific number of new messages.

### Demos

### API

| Property     |  Description  | Type     | Default  | Alternative |
| ---------| ----------------- | ------  | -------------|----------------- |
| count | The number of messages to show | int | `0` | |
| maxCount | Max count to show | int | `99`  |                  |
| dot | Whether to show red dot without number | bool | `false` | `true`, `false` |
| showZero | Whether to show badge when count is zero | bool | `false` | `true`, `false`  |
| className| The custom classname | string   | `''` |   |
| prefix | The custom prefix | string   | `'zent'` |  |



<style>
.zent-badge .demo-cont {
	width: 40px;
	height: 40px;
	line-height: 40px;
	border-radius: 20px;
	background: #38f;
	color: #fff;
	font-size: 20px;
}
.zent-badge {
	margin-right: 30px;
}
.zent-badge-demo-wrapper {
	display: flex;
	align-items: center;
}
</style>
