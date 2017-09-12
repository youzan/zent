/**
 * Index
 */

import Select from './Select';
import Option from './components/Option';
import SelectTrigger from './trigger/SelectTrigger';
import InputTrigger from './trigger/InputTrigger';
import TagsTrigger from './trigger/TagsTrigger';

Select.Option = Option;
Select.SelectTrigger = SelectTrigger;
Select.InputTrigger = InputTrigger;
Select.TagsTrigger = TagsTrigger;

export { Option, SelectTrigger, InputTrigger, TagsTrigger };

export default Select;
