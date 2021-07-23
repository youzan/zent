## 国际化

目前 Zent 的默认语言为中文，同时提供英文支持。如需要在国际化场景下使用 Zent 组件，可以参考下面的方法。

#### I18nProvider

Zent 提供一个 Provider 组件用于配置组件内部文案的语言。组件利用 context 实现对组件内部文案的配置，需要在应用最外层包裹使用。

```jsx
import { I18nProvider, enUSLocale } from 'zent';

<I18nProvider value={enUSLocale}>
	<App />
</I18nProvider>;
```

目前支持中文、英文以及日文三种语言包。
