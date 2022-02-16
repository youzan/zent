---
title: Progress Indicator
path: component/indicator
group: Feedback
scatter: true
---

## Progress Indicator

Feedback the complete process information objectively in order and mark the current process or node and state.

### Suggestion

- When the task is complex or has a sequential relationship, the progress indicator will decompose it into multiple nodes, simplifying the user's cognition and operation cost of each step and feedback the current state.
- When a task contains multiple nodes with contextual relationship and needs to feedback the task flow status, the progress indicator is used.
- When a complex task needs to be broken down into multiple tasks, use the navigation step bar.
- If only the progress of a task does not contain multiple nodes, use the progress bar.
- If the content can be split into multiple sub-contents without any logical relationship, use tabs.

### Demos

<!-- demo-slot-1 -->
<!-- demo-slot-2 -->
<!-- demo-slot-3 -->

### API

| Property     | Description                                                                                                                                      | Type    | Required       | Default                         | Alternative |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------- | -------------- | ------------------------------- | ----------- |
| current      | The curren step which starts from 1. When this property is not passed, `current` is 0 and steps is in status of `wait`.                          | number  | `0`            |                                 |
| status       | The status of indicator.                                                                                                                         | string  | `'process'`    | `'wait'`, `'finish'`, `'error'` |
| sequence     | Whether to use the default number or not                                                                                                         | boolean | `true`         |                                 |
| onStepChange | The callback function that is triggered when the steps in clicked and changed, especially for steps of card type, breadcrumb type and tabs type. | func    | `''`           |                                 |
| direction    | The direction of steps, especially for steps of number type.                                                                                     | string  | `'horizontal'` | `'vertical'`                    |
| className    | The custom classname                                                                                                                             | string  | `''`           |

#### The following functions is obsolete in the new design system and is only used as a reference for the old version

<!-- demo-slot-4 -->
