---
title: Steps
path: component/steps
group: Navigation
---

## Steps

Steps is suitable for operations that need to be guided step by step.

### API

#### Steps

| Property     |  Description  | Type     | Default  | Alternative |
| --------- | -------------- | ------ | ---------- | ----------|
| type      | The type of steps                                  | string | `'number'`     | `'card'`,  `'breadcrumb'`,  `'tabs'` |
| direction | The direction of steps, especially for steps of number type.     | string | `'horizontal'`     | `'vertical'` |
| current   | The curren step which starts from 1. When this property is not passed, `current` is 0 and steps is in status of `wait`. | number | `0`|       |
| status    | The status of steps.  | string | `'process'`    | `'wait'`, `'finish'`, `'error'`      |
| sequence    | Whether to use the default step number or not  | boolean | `true`  |      |
| onStepChange | The callback function that is triggered when the steps in cliked and changed, especially for steps of card type, breadcrumb type and tabs type. | func | `''`  |   |
| className | The custom classname | string | `''` | |
| prefix    | The custom prefix   | string | `'zent'` |     |

#### Steps.Step

`Steps.Step` is each item of the `Step` component.

| Property     |  Description  | Type     |
| ----------- | ----------------------------------- | ---- |
| title       | the title of each item in steps  | node |
| description | The details of each item in steps (This propterty is not supported in steps of card type, breadcrumb type and tabs type. ) | node |

### Known issues

This component didn't deal with the situation where there is only one step. In fact, you shouldn't use this component when there is only one step.
