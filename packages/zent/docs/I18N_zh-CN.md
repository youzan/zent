## 国际化

目前 Zent 的默认语言为中文，同时提供英文支持。如需要在国际化场景下使用 Zent 组件，可以参考下面的方法。

#### I18nProvider

Zent 提供一个 Provider 组件用于配置组件内部文案的语言。组件利用 context 实现对组件内部文案的配置，需要在应用最外层包裹使用。

```jsx
import { I18nProvider as Provider } from 'zent';
import enUS from 'zent/lib/i18n/en-US';

<Provider i18n={enUS}>
	<App />
</Provider>
```

目前仅有中文/英文两种语言包，分别对应i18n文件夹下 `en-US.js`/`zh-CN.js`两个文件。
