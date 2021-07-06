import Loadable from 'react-loadable';

import DocLoading from './Loading';

export default function DocLoadable(
  opts: Pick<Loadable.OptionsWithoutRender<unknown>, 'loader'>
) {
  return Loadable(
    Object.assign(
      {
        loading: DocLoading,
        delay: 200, // Avoiding Flash Of Loading Component
        timeout: 5000, // 5 seconds
      },
      opts
    )
  );
}
