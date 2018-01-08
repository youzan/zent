## I18n

The default language of Zent is Simplified Chinese, if you want switch to Engilish, you can follow the instruction below.

#### I18nProvider

Zent provides a React Component I18nProvider used to configure the locale text. Components using context, a feature of React, to achieve global effectiveness by wrapping your app.

```jsx
import { I18nProvider as Provider } from 'zent';
import enUS from 'zent/lib/i18n/en-US';

<Provider i18n={enUS}>
	<App />
</Provider>
```

At present, only Chinese / English language packs are available, corresponding to two files of `en-US.js` /` zh-CN.js` in i18n folder.