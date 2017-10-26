import Loadable from 'react-loadable';
import DocLoading from './Loading';

export default function DocLoadable(opts) {
  return Loadable(Object.assign({
    loading: DocLoading,
    delay: 200,
    timeout: 1000
  }, opts));
};
