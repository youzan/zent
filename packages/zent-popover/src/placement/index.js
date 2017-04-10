import createPlacement from './create';
import BottomLeftPlacement from './bottom-left';
import BottomCenterPlacement from './bottom-center';
import BottomRightPlacement from './bottom-right';
import LeftTopPlacement from './left-top';
import LeftCenterPlacement from './left-center';
import LeftBottomPlacement from './left-bottom';
import RightTopPlacement from './right-top';
import RightCenterPlacement from './right-center';
import RightBottomPlacement from './right-bottom';
import TopLeftPlacement from './top-left';
import TopCenterPlacement from './top-center';
import TopRightPlacement from './top-right';
import AutoBottomLeftPlacement from './auto-bottom-left';

export default {
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
  TopRight: TopRightPlacement,
  AutoBottomLeft: AutoBottomLeftPlacement
};
