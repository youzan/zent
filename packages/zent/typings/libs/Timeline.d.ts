/// <reference types="react" />

declare module 'zent/lib/timeline' {

  interface ITimelineLegendProps {
    color?: string;
    children?: React.ReactNode;
    prefix?: string;
    className?: string;
    style?: React.CSSProperties;
  }

  export class TimelineLegend extends React.Component<ITimelineLegendProps, any> {}

  interface ITimelineItemProps {
    size?: number;
    showLabel?: boolean;
    showDot?: boolean;
    color?: string;
    lineColor?: string;
    dotColor?: string;
    label?: React.ReactNode;
    tip?: React.ReactNode;
    prefix?: string;
    className?: string;
    style?: React.CSSProperties;
    type?: 'vertical' | 'horizontal';
  }

  export class TimelineItem extends React.Component<ITimelineItemProps> {}

  interface ITimelineArrayItem extends ITimelineItemProps {
    id?: string;
    percent?: number;
  }

  interface ITimelineProps {
    size?: number | string;
    timeline?: ITimelineArrayItem[];
    type?: 'vertical' | 'horizontal';
    className?: string;
    style?: React.CSSProperties;
  }

  export class Timeline extends React.Component<ITimelineProps, any> {
    static Legend: typeof TimelineLegend;
    static Item: typeof TimelineItem;
  }

  export default Timeline;
}
