---
title: TextMark
path: component/text-mark
group: Data Display
---

## TextMark

Highlight selected words in a string.

### API

| Property     |  Description  | Type     |  Required  |   Default  | Alternative   |
| ------------ | -------------- | -------- | ---------- | ---------- | ------------- |
| textToHighlight | Text to be searched | string | Yes | | |
| searchWords | Search words, will be converted to RegExp | Array<string \| RegExp> | Yes | | |
| highlightClassName | Highlight CSS class name, you can have different class names for each search word | string \| object | No | | |
| highlightStyle | Highlight inline style | object | No | | |
| activeClassName | Active CSS class name | string | No       |        |        |
| activeStyle | Active inline style | object | No |  | |
| activeIndex | Active index | number | No | | |
| unhighlightClassName | Unhighlight CSS class name | string | No | | |
| unhighlightStyle | Unhighlight inline style  | object | No | | |
| highlightTag | Component to render highlighted text | React.ElementType | No | `'mark'` | |
| sanitize | Preprocessor for search words and text | (str: string) => string | No | identity | |
| autoEscape | Automatically escape RegExp special characters in search words | boolean | No | `false` |  `true` |
| caseSensitive | Case sensitive match | boolean | No | `false` | `true` |
| findChunks | Customize matching algorithm | (options) => Array<{start: number; end: number; highlight: boolean;}> | No | | |
| className | Custom top level CSS class name | string | No | | |
| style | Custom top level inline style | object | No | | |
