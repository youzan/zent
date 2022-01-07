---
title: StatusBar
path: component/status-bar
group: Feedback
---

## StatusBar

Deliver task-related behavioral feedback

### Suggestion

- Use: demonstrated in response to user actions during tasks, providing direct and immediate feedback to users and ensuring they know how to take action when necessary;
- Location: located in the same container with the operation object, above the operation object, with the container adaptive;

### Note

- Prohibit the stacking of multiple states.

### API

| Property     | Description                                                                    | Type        | Required | Default  | Alternative                         |
| ------------ | ------------------------------------------------------------------------------ | ----------- | -------- | -------- | ----------------------------------- |
| type         | Status bar type                                                                | string      | false    | `'info'` | `'waiting'`\|`'success'`\|`'error'` |
| progress     | Task progress at the top of the status bar, only displayed when 'type=waiting' | number      | false    |          |                                     |
| extraContent | extra content on the right of Status Bar                                       | `ReactNode` | false    |          |

Consult [Alert's documentation](https://youzan.github.io/zent/en/component/alert) to find more APIs.
