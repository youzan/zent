// @rollup/plugin-commonjs will use filename as variable name,
// variable "Sortable" will conflict because zent component and "sortablejs" lib use same filename,
// use this file transform lib variable name
import * as Sortable from 'sortablejs';

const SortableJs = Sortable;

export default SortableJs;
