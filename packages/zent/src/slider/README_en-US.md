---
title: Slider
path: component/slider
group: Data Entry
scatter: true
---

## Slider

You can select a value by dragging or clicking `Slider`.

### Guides

- Support a single slider and double slider.
- Can be used with `Input`.
- 
<!-- demo-slot-1 -->
<!-- demo-slot-3 -->
<!-- demo-slot-6 -->
<!-- demo-slot-7 -->

### API

| Property  | Description                                                               | Type             | Default | Alternative | Required |
| --------- | ------------------------------------------------------------------------- | ---------------- | ------- | ----------- | -------- |
| value     | The value of input                                                        | [number,array]   | 0       | [0,0]       | yes      |
| onChange  | The callback function that is triggered when the slider is changed        | func(e:Event)    |         |             | no       |
| range     | Whether the range selection can be used or not                            | bool             | false   |             | no       |
| max       | The max value                                                             | number           | 100     | 50          | no       |
| min       | The min value                                                             | number           | 0       | -100        | no       |
| step      | The interval between values                                               | number           | 1       |             | no       |
| withInput | Whether the input is included                                             | bool             | `true`  | `false`     | no       |
| dots      | Whether the value of slider can only be selected from label values or not | bool             | false   |             | no       |
| marks     | label values                                                              | object           |         |             | no       |
| disabled  | Disable the silder                                                        | bool             | `false` |             | no       |
| className | The custom classname                                                      | string           | `''`    |             | no       |
| width     | width                                                                     | string or number |         |             | no 否    |

**Ps.** When setting `range`, you should set `value` as an array of length 2. The array entry must be a number. Property `dots` must be used with `marks`.

#### The following functions is obsolete in the new design system and is only used as a reference for the old version

<!-- demo-slot-2 -->
<!-- demo-slot-4 -->
<!-- demo-slot-5 -->

