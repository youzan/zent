import {
  StatelessComponent,
  ReactNode,
  CSSProperties,
  PureComponent,
} from 'react';

declare module 'zent/lib/timeline' {
  interface ITimelineDotProps {
    color?: string;
    prefix?: string;
  }

  export const TimelineDot: StatelessComponent<ITimelineDotProps>;

  interface ITimelineSampleProps {
    color?: string;
    children?: ReactNode;
    prefix?: string;
  }

  export const TimelineSample: StatelessComponent<ITimelineSampleProps>;

  interface ITimelineItemProps {
    size?: number;
    showLabel?: boolean;
    showDot?: boolean;
    color?: boolean;
    lineColor?: boolean;
    dotColor?: boolean;
    label?: ReactNode;
    tip?: ReactNode;
    prefix?: string;
    className?: string;
    style?: CSSProperties;
    type?: 'vertical' | 'horizontal';
  }

  export const TimelineItem: StatelessComponent<ITimelineItemProps>;

  interface ITimelineArrayItem extends ITimelineItemProps {
    id?: string;
    color?: string;
    percent?: number;
  }

  interface ITimelineProps {
    size?: number | string;
    timeline?: ITimelineArrayItem[];
    type?: 'vertical' | 'horizontal';
    className?: string;
    style?: CSSProperties;
  }

  export class Timeline extends PureComponent<ITimelineProps, any> {}

  export namespace Timeline {
    const Sample = TimelineSample;
    const Dot = TimelineDot;
    const Item = TimelineItem;
  }

  export default Timeline;
}
