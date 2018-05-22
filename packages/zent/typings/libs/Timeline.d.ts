import {
  ReactNode,
  CSSProperties,
  Component,
} from 'react';

declare module 'zent/lib/timeline' {

  interface ITimelineLegendProps {
    color?: string;
    children?: ReactNode;
    prefix?: string;
    className?: string;
    style?: CSSProperties;
  }

  export class TimelineLegend extends Component<ITimelineLegendProps, any> {}

  interface ITimelineItemProps {
    size?: number;
    showLabel?: boolean;
    showDot?: boolean;
    color?: string;
    lineColor?: string;
    dotColor?: string;
    label?: ReactNode;
    tip?: ReactNode;
    prefix?: string;
    className?: string;
    style?: CSSProperties;
    type?: 'vertical' | 'horizontal';
  }

  export class TimelineItem extends Component<ITimelineItemProps> {}

  interface ITimelineArrayItem extends ITimelineItemProps {
    id?: string;
    percent?: number;
  }

  interface ITimelineProps {
    size?: number | string;
    timeline?: ITimelineArrayItem[];
    type?: 'vertical' | 'horizontal';
    className?: string;
    style?: CSSProperties;
  }

  export class Timeline extends Component<ITimelineProps, any> {
    static Legend: typeof TimelineLegend;
    static Item: typeof TimelineItem;
  }

  export default Timeline;
}
