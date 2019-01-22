import Row from './components/Row';
import Col from './components/Col';
import Grid from './components/Grid';
import ConfigContext from './components/ConfigContext';

const Layout = {
  Row,
  Col,
  Grid,
  ConfigProvider: ConfigContext.Provider,
};

export default Layout;
