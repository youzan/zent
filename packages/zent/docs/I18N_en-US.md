## I18n

The default language of Zent is Simplified Chinese, if you want switch to Engilish, you can follow the instruction below.

#### I18nProvider

Zent provides a React Component I18nProvider used to configure the locale text. Components using context, a feature of React, to achieve global effectiveness by wrapping your app.

```jsx
import { I18nProvider, enUSLocale } from 'zent';
import enUS from 'zent/es/i18n/en-US';

<I18nProvider value={enUSLocale}>
	<App />
</I18nProvider>
```

Only Chinese, English and Japanese language packs are available.
