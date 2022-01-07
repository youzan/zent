---
title: Steps
path: component/steps
group: Feedback
scatter: true
---

## Steps

Located in the head of the form, it is used for step by step display of large or strong logical forms, providing jump ability.

#### Suggestion

- When the task is complex or there is a sequence relationship, the step bar can be divided into multiple steps to simplify the user's cognition and operation cost of each step and feedback the current state.
- `Step` is used when a large volume or strong logical form needs to be displayed step by step and the skipping ability is provided.
- When a task contains multiple nodes with contextual relationship and needs to feedback the task flow status, the `Indicator` is used.
- If only the progress of a task does not contain multiple nodes, use the `Progress`.
- If the content can be split into multiple sub-contents without any logical relationship, use `Tabs`.

<!-- demo-slot-1 -->
<!-- demo-slot-2 -->
<!-- demo-slot-3 -->

### API

#### Steps

| Property     | Description                                                                                                                                     | Type    | Default        | Alternative                        |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------------- | ---------------------------------- |
| type         | The type of steps                                                                                                                               | string  | `'number'`     | `'card'`, `'breadcrumb'`, `'tabs'` |
| direction    | The direction of steps, especially for steps of number type.                                                                                    | string  | `'horizontal'` | `'vertical'`                       |
| current      | The curren step which starts from 1. When this property is not passed, `current` is 0 and steps is in status of `wait`.                         | number  | `0`            |                                    |
| status       | The status of steps.                                                                                                                            | string  | `'process'`    | `'wait'`, `'finish'`, `'error'`    |
| sequence     | Whether to use the default step number or not                                                                                                   | boolean | `true`         |                                    |
| onStepChange | The callback function that is triggered when the steps in cliked and changed, especially for steps of card type, breadcrumb type and tabs type. | func    | `''`           |                                    |
| className    | The custom classname                                                                                                                            | string  | `''`           |                                    |
| ghost        | Use reverse color styles (This property supports only breadcrumb type. )                                                                        | boolean | false          |

**Use Indicator for progress indicators of type [type=number]**

#### Steps.Step

`Steps.Step` is each item of the `Step` component.

| Property    | Description                                                                                                                | Type                   |
| ----------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| title       | the title of each item in steps                                                                                            | `'node'`               |
| description | The details of each item in steps (This propterty is not supported in steps of card type, breadcrumb type and tabs type. ) | `'node'`               |
| icon        | Custom icons                                                                                                               | `'string'` \| `'node'` |

### Known issues

This component didn't deal with the situation where there is only one step. In fact, you shouldn't use this component when there is only one step.

#### The following functions is obsolete in the new design system and is only used as a reference for the old version

<!-- demo-slot-4 -->
<!-- demo-slot-5 -->
