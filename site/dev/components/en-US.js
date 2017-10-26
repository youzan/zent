import Loadable from 'react-loadable';
import { Loading } from 'zent';

export default Loadable({
  loader: () => import('../sample/README_en-US.md'),
  loading: Loading
});
