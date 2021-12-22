---
title: Banner
path: component/banner
group: Data Display
---

## Banner

Deliver promotional messages to users

### Suggestion

- Usage: Used to pass product promotion information to users. The bulletin exists until it is processed or closed by the user.
- Location: The announcement is usually located above the container of the content area of the page and below the navigation bar. It ADAPTS to the width of the content area.

### Note

- Use announcements only when necessary, and limit them to the task interface related to their content. Frequent use may cause users to pay less attention to announcements;
- Do not stack multiple bulletins. If multiple bulletins exist on a single page, only the bulletins with the highest priority are displayed.

### API

| Property        | Description        | Type   | Required | Default | Alternative                    |
| --------------- | ------------------ | ------ | -------- | ------- | ------------------------------ |
| backgroundImage | background image   | string | false    |         |                                |
| closeIconColor  | Custom close color | string | false    |         | `'grey'`\|`'white'`\| `string` |

Consult [Alert's documentation](https://youzan.github.io/zent/en/component/alert) to find more APIs.
