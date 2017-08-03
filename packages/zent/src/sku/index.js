import { flatten, isEqual } from './utils';
import SKU from './SKU';

SKU.flatten = flatten;
SKU.isSame = isEqual;
SKU.isEqual = isEqual;

export default SKU;
