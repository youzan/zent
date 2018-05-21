---
order: 1
zh-CN:
	title: "简单用法"
	ellipsisText: 满纸荒唐言，一把辛酸泪。都云作者痴，谁解其中味!
en-US:
	title: "Simple usage"
	ellipsisText: Pages full of idle words; Penned with hot and bitter tears; All men call the author fool; None his secret message hears.
---

```jsx
import { Pop, Button, Input, PopEllipsisText } from 'zent';

ReactDOM.render(
    <PopEllipsisText
        width={240}
        text="{i18n.ellipsisText}"
        position='right-center'
    />
	, mountNode
)
```
