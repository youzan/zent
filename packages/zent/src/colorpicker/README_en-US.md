---
title: ColorPicker
path: component/colorpicker
group: Data Entry
---

## ColorPicker

ColorPicker is used for color selection and supports multiple formats.

### API

#### ColorPicker

| Property     |  Description  | Type     | Default  | Alternative |
| ------------- | ------------------- | ------------------- | ----------- | --------- |
| color | The color of ColorPicker | string |  |   `'#5197FF'` or `'rgba(81, 151, 255, 0.6)'`  |
| showAlpha     | Whether to show opacity selection | bool | `false`  |   `true/false` |
| type | The type of ColorPicker | string  | `'default'`   |   `'default'`、`'simple'`      |
| presetColors  | Simple version of custom color array  | array | [`'#FFFFFF'`, `'#F8F8F8'`, `'#F2F2F2'`, `'#999999'`, `'#444444'`, `'#FF4444'`, `'#FF6500'`, `'#FF884D'`, `'#FFCD00'`, `'#3FBD00'`, `'#3FBC87'`, `'#00CD98'`, `'#5197FF'`, `'#BADCFF'`, `'#FFEFB8'`] |         |
| onChange      | The callback function that is triggerd when color is changed | func(color) | `noop`   |  |
| className     | The custom classname   | string  | `''`     |         |
| wrapperClassName | The  custom classname of trigger's parent node | string | `''` |  |
| prefix        | The custom prefix  | string              | `'zent'` |         |

#### ColorBoard

| Property     |  Description  | Type     | Default  | Alternative |
| ------------- | ------------------- | ------------------- | ----------- | --------- |
| color         | The color of ColorPicker     | string              |          |   `'#5197FF'` or `'rgba(81, 151, 255, 0.6)'`  |
| showAlpha     | Whether to show opacity selection    | bool                | `false`  |   `true/false`     |
| onChange      | The callback function that is triggerd when color is changed    | func(color)         | `noop`   |         |
| className     | The cutom clasname      | string              | `''`     |         |
| prefix        | The custom prefix      | string              | `'zent'` |         |
