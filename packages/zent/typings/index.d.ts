// TypeScript Version: 2.3

/// <reference types="react" />

/// <reference path="./libs/Affix.d.ts" />
/// <reference path="./libs/Alert.d.ts" />
/// <reference path="./libs/Avatar.d.ts" />
/// <reference path="./libs/AutoComplete.d.ts" />
/// <reference path="./libs/Badge.d.ts" />
/// <reference path="./libs/BlockHeader.d.ts" />
/// <reference path="./libs/Breadcrumb.d.ts" />
/// <reference path="./libs/Button.d.ts" />
/// <reference path="./libs/Card.d.ts" />
/// <reference path="./libs/Cascader.d.ts" />
/// <reference path="./libs/CheckBox.d.ts" />
/// <reference path="./libs/Collapse.d.ts" />
/// <reference path="./libs/ColorPicker.d.ts" />
/// <reference path="./libs/CopyButton.d.ts" />
/// <reference path="./libs/DateRangeQuickPicker.d.ts" />
/// <reference path="./libs/DateTimePicker.d.ts" />
/// <reference path="./libs/Design.d.ts" />
/// <reference path="./libs/Dialog.d.ts" />
/// <reference path="./libs/ErrorBoundary.d.ts" />
/// <reference path="./libs/Form.d.ts" />
/// <reference path="./libs/Grid.d.ts" />
/// <reference path="./libs/Icon.d.ts" />
/// <reference path="./libs/InfiniteScroller.d.ts" />
/// <reference path="./libs/Input.d.ts" />
/// <reference path="./libs/Layout.d.ts" />
/// <reference path="./libs/Loading.d.ts" />
/// <reference path="./libs/Menu.d.ts" />
/// <reference path="./libs/Mention.d.ts" />
/// <reference path="./libs/Notify.d.ts" />
/// <reference path="./libs/NumberInput.d.ts" />
/// <reference path="./libs/Pagination.d.ts" />
/// <reference path="./libs/Placeholder.d.ts" />
/// <reference path="./libs/Pop.d.ts" />
/// <reference path="./libs/Popover.d.ts" />
/// <reference path="./libs/Portal.d.ts" />
/// <reference path="./libs/previewImage.d.ts" />
/// <reference path="./libs/Progress.d.ts" />
/// <reference path="./libs/Radio.d.ts" />
/// <reference path="./libs/Rate.d.ts" />
/// <reference path="./libs/SearchInput.d.ts" />
/// <reference path="./libs/Select.d.ts" />
/// <reference path="./libs/SKU.d.ts" />
/// <reference path="./libs/Slider.d.ts" />
/// <reference path="./libs/Sortable.d.ts" />
/// <reference path="./libs/SplitButton.d.ts" />
/// <reference path="./libs/Steps.d.ts" />
/// <reference path="./libs/Sweetalert.d.ts" />
/// <reference path="./libs/Swiper.d.ts" />
/// <reference path="./libs/Switch.d.ts" />
/// <reference path="./libs/Table.d.ts" />
/// <reference path="./libs/Tabs.d.ts" />
/// <reference path="./libs/Tag.d.ts" />
/// <reference path="./libs/Timeline.d.ts" />
/// <reference path="./libs/Tree.d.ts" />
/// <reference path="./libs/Upload.d.ts" />

declare module 'zent' {
  import Affix from 'zent/lib/affix';
  import Alert from 'zent/lib/alert';
  import Avatar from 'zent/lib/avatar';
  import AutoComplete from 'zent/lib/auto-complete';
  import Badge from 'zent/lib/badge';
  import BlockHeader from 'zent/lib/block-header';
  import Breadcrumb from 'zent/lib/breadcrumb';
  import Button from 'zent/lib/button';
  import Cascader from 'zent/lib/cascader';
  import Card from 'zent/lib/card';
  import Checkbox from 'zent/lib/checkbox';
  import ColorPicker from 'zent/lib/colorpicker';
  import Collapse from 'zent/lib/collapse';
  import CopyButton from 'zent/lib/copy-button';
  import DateRangeQuickPicker from 'zent/lib/date-range-quick-picker';
  import DatePicker from 'zent/lib/datetimepicker/DatePicker';
  import DateRangePicker from 'zent/lib/datetimepicker/DateRangePicker';
  import Design from 'zent/lib/design';
  import Dialog from 'zent/lib/dialog';
  import ErrorBoundary from 'zent/lib/error-boundary';
  import Form from 'zent/lib/form';
  import Grid from 'zent/lib/grid';
  import Layout from 'zent/lib/layout';
  import Loading from 'zent/lib/loading';
  import Icon from 'zent/lib/icon';
  import Input from 'zent/lib/input';
  import InfiniteScroller from 'zent/lib/infinite-scroller';
  import NumberInput from 'zent/lib/number-input';
  import Mention from 'zent/lib/mention';
  import Menu from 'zent/lib/menu';
  import MonthPicker from 'zent/lib/datetimepicker/MonthPicker';
  import Notify from 'zent/lib/notify';
  import Pagination from 'zent/lib/pagination';
  import Placeholder from 'zent/lib/placeholder';
  import Pop from 'zent/lib/pop';
  import Popover from 'zent/lib/popover';
  import Portal from 'zent/lib/portal';
  import previewImage from 'zent/lib/preview-image';
  import Progress from 'zent/lib/progress';
  import QuarterPicker from 'zent/lib/datetimepicker/QuarterPicker';
  import Radio from 'zent/lib/radio';
  import Rate from 'zent/lib/rate';
  import SearchInput from 'zent/lib/search-input';
  import Select from 'zent/lib/select';
  import SKU from 'zent/lib/sku';
  import Slider from 'zent/lib/slider';
  import Sortable from 'zent/lib/sortable';
  import SplitButton from 'zent/lib/split-button';
  import Steps from 'zent/lib/steps';
  import Sweetalert from 'zent/lib/sweetalert';
  import Swiper from 'zent/lib/swiper';
  import Switch from 'zent/lib/switch';
  import Table from 'zent/lib/table';
  import Tabs from 'zent/lib/tabs';
  import Tag from 'zent/lib/tag';
  import Tree from 'zent/lib/tree';
  import Timeline from 'zent/lib/timeline';
  import TimePicker from 'zent/lib/datetimepicker/TimePicker';
  import TimeRangePicker from 'zent/lib/datetimepicker/TimeRangePicker';
  import Upload from 'zent/lib/upload';
  import WeekPicker from 'zent/lib/datetimepicker/WeekPicker';
  import YearPicker from 'zent/lib/datetimepicker/YearPicker';

  export {
    Affix,
    Alert,
    Avatar,
    AutoComplete,
    Badge,
    BlockHeader,
    Breadcrumb,
    Button,
    Cascader,
    Card,
    Checkbox,
    ColorPicker,
    Collapse,
    CopyButton,
    DatePicker,
    DateRangePicker,
    DateRangeQuickPicker,
    Design,
    Dialog,
    ErrorBoundary,
    Form,
    Grid,
    Layout,
    Loading,
    Icon,
    Input,
    InfiniteScroller,
    NumberInput,
    Mention,
    Menu,
    MonthPicker,
    Notify,
    Pagination,
    Placeholder,
    Pop,
    Popover,
    Portal,
    previewImage,
    Progress,
    QuarterPicker,
    Radio,
    Rate,
    SearchInput,
    Select,
    SKU,
    Slider,
    Sortable,
    SplitButton,
    Steps,
    Sweetalert,
    Swiper,
    Table,
    Tabs,
    Tag,
    Tree,
    Timeline,
    TimePicker,
    TimeRangePicker,
    Switch,
    Upload,
    WeekPicker,
    YearPicker,
  };
}
