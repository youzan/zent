---
title: Mention
path: component/mention
group: Data Entry
---

## Mention

Use `Mention` when you need to mention someone or something when typing, e.g. @somebody.

### API

| Property | Description | Type | Required | Default | Alternative |
|------|------|------|--------|--------|-----|
| value | Input content value | `string` | Yes | | |
| onChange | Callback when input content changes | `(val: string): void` | Yes | | |
| onSearchChange | Callback when mention search keyword changes | `(search: string): void` | No | | |
| multiLine | Multi line input | `bool` | No | `false` | `true` |
| position | Popup position relative to text | `string` | No | `bottom` | `top` |
| suggestions | Suggestions for current mention | `array` | No | | |
| suggestionNotFoundContent | Content to display when no suggestion found | `node` | No | `'No results found, press SPACE to finish typing'` | |
| triggerText | Text to trigger a mention | `string` | No | `'@'` | |
| prefix | Custom class prefix | `string` | No | `'zent'` | |
| className | Custom class name | `string` | No | | |

> `Mention` supports all `Input` props，e.g. `placeholder`.

#### Supported `suggestions` data types

Every item in `suggestions` can be one of:

* `string`
* `number`
* `object`

Item object structure:

| Property | Description | Type | Required |
|------|------|------|--------|
| value | Item value | `string` | Yes |
| content | Item display content，defaults to `value` if omitted | `node` | No |
| isGroup | Group item | `bool` | No |
| isDivider | Divider item | `bool` | No |
| icon | Show item icon | `string` | No |
| disabled | Disable item | `bool` | No |
