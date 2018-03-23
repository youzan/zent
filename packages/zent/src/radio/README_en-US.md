---
title: Radio
path: component/radio
group: Data Entry
---

## Radio

`RadioGroup` is a [controlled-component][https://facebook.github.io/react/docs/forms.html#controlled-components]. There must be a `onChange` callback dealing with changes outside.

### API

#### RadioGroup

| Props           | Description                | Type             | Default                 |
| ------------ | ----------------- | -------------- | ------------------- |
| value        | Used to set the currently selected value        | any            |                     |
| disabled      | Disable the radio group | bool          |          |
| readOnly      | It specifies the component is read-only | bool          |          |
| onChange     | change callback        | func(e: event) |                     |
| isValueEqual | Optional, a function to determine whether values is equal | func(a, b)     | `(a, b) => a === b` |
| className    | custom classname           | string         |                     |
| prefix       | custom prefix  | string         | `'zent'`            |

#### Radio

| Props        | Description                   | Type     | Default      |
| --------- | -------------------- | ------ | -------- |
| value     | Compare according to the, determine if selected | any    |          |
| disabled      | Disable the radio | bool          |          |
| readOnly      | It specifies the component is read-only | bool          |          |
| className | custom classname              | string |          |
| width    | radio's width           | string or number         |                     |
| prefix    | custom prefix     | string | `'zent'` |
