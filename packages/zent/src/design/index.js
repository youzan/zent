import Design from './DesignWithDnd';
import DesignWithoutDnd from './Design';
import stripUUID from './stripUUID';
import { group } from './utils/component-group';

Design.stripUUID = stripUUID;
Design.group = group;
Design.DesignWithoutDnd = DesignWithoutDnd;

export default Design;
