import Portal from './Portal';
import PurePortal from './PurePortal';
import LayeredPortal from './LayeredPortal';
import withESCToClose from './withESCToClose';
import withNonScrollable from './withNonScrollable';

Portal.withESCToClose = withESCToClose;
Portal.withNonScrollable = withNonScrollable;
Portal.PurePortal = PurePortal;
Portal.LayeredPortal = LayeredPortal;

export default Portal;
