import Design from './DesignWithDnd';
import DesignWithoutDnd from './Design';
import stripUUID from './stripUUID';
import { createGroup } from './utils/component-group';

Design.stripUUID = stripUUID;
Design.group = createGroup;
Design.DesignWithoutDnd = DesignWithoutDnd;

export default Design;
