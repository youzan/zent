---
title: Cascader
path: component/cascader
group: Data Entry
---

## Cascader

Cascader is used for cascade operation, e.g. cascade location selection.

### API

| Props | Description | Type | Default | Alternatives |
|------|------|------|--------|--------|
| value | The selected value | array | [] | '' |
| type | UI type, tab style or menu style | string | 'tabs' | 'menu' |
| options | Optional data source | array | [] | '' |
| title | Title of tab, tab title default is `'Title'` | array | [] | '' |
| onChange | The callback when data changes | func | noop | '' |
| loadMore | Function to load data dynamicly, must return Promise | func | - | '' |
| changeOnSelect | Wether trigger change once sth. is seleted | boolean | false | '' |
| expandTrigger |  Secondary menu expand trigger type. Optional 'click' 和 'hover'. only for type='menu' | string | 'click' | 'hover' |
| placeholder | The placeholder text of input box | string | 'Please choose' | '' |
| prefix | custom prefix | string | 'zent' | '' |
| className | custom classname | string | '' | '' |
| popClassName | custom classname of popover | string | ''zent-cascader__popup'' | '' |
| displayText | function to customize the display text, selectedOptionArray => text | func | - | |

-   The source data can be fully passed with `options` or dynamic loaded.
-   The `root` parameter is data object of current clicked element, and `stage` parameter is the level number when load data throught `loadMore`.
-   The `isLeaf` paramter is used for `loadMore`. It controls wether click on the node triggers a request.
