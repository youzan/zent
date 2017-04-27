/**
 * Index
 */

import Select from './Select';
import Option from './components/Option';
import SelectTrigger from './triggers/SelectTrigger';
import InputTrigger from './triggers/InputTrigger';
import TagsTrigger from './triggers/TagsTrigger';

Select.Option = Option;
Select.SelectTrigger = SelectTrigger;
Select.InputTrigger = InputTrigger;
Select.TagsTrigger = TagsTrigger;

export { Option, SelectTrigger, InputTrigger, TagsTrigger };

export default Select;
