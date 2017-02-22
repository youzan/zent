import Popover from './Popover';
import withPopover from './withPopover';
import ClickTrigger from './trigger/ClickTrigger';
import HoverTrigger from './trigger/HoverTrigger';
import FocusTrigger from './trigger/FocusTrigger';
import Trigger from './trigger/Trigger';
import Content from './Content';
import createPlacement from './placement/create';
import BottomLeftPlacement from './placement/bottom-left';
import BottomCenterPlacement from './placement/bottom-center';
import BottomRightPlacement from './placement/bottom-right';
import LeftTopPlacement from './placement/left-top';
import LeftCenterPlacement from './placement/left-center';
import LeftBottomPlacement from './placement/left-bottom';
import RightTopPlacement from './placement/right-top';
import RightCenterPlacement from './placement/right-center';
import RightBottomPlacement from './placement/right-bottom';
import TopLeftPlacement from './placement/top-left';
import TopCenterPlacement from './placement/top-center';
import TopRightPlacement from './placement/top-right';

Popover.Content = Content;
Popover.Trigger = {
  Click: ClickTrigger,
  Hover: HoverTrigger,
  Focus: FocusTrigger,
  Base: Trigger
};
Popover.Position = {
  create: createPlacement,
  BottomLeft: BottomLeftPlacement,
  BottomCenter: BottomCenterPlacement,
  BottomRight: BottomRightPlacement,
  LeftTop: LeftTopPlacement,
  LeftCenter: LeftCenterPlacement,
  LeftBottom: LeftBottomPlacement,
  RightTop: RightTopPlacement,
  RightCenter: RightCenterPlacement,
  RightBottom: RightBottomPlacement,
  TopLeft: TopLeftPlacement,
  TopCenter: TopCenterPlacement,
  TopRight: TopRightPlacement
};
Popover.withPopover = withPopover;

export default Popover;
