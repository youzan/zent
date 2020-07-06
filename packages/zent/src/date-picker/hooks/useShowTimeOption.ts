import * as React from 'react';
import { startOfToday, endOfToday } from 'date-fns';
import { formatDate } from '../utils/index';
import { IShowTime, IShowTimeOption } from '../types';
import { TIME_FORMAT } from '../constants';

const formatStartDate = (format: string) => formatDate(startOfToday(), format);
const formatEndDate = (format: string) => formatDate(endOfToday(), format);
const DefaultStartTime = formatStartDate(TIME_FORMAT);
const DefaultEndTime = formatEndDate(TIME_FORMAT);
/**
 * 获取showTime范围
 * @param showTime
 */
export function useShowTimeRangeOption<T>(
  showTime: IShowTime<T>
): IShowTimeOption<string>[] {
  const showTimeRef = React.useRef(showTime);

  const showTimeOption = React.useMemo(() => {
    if (!showTimeRef.current) {
      return [undefined, undefined];
    }
    if (typeof showTimeRef.current === 'object') {
      const {
        format = TIME_FORMAT,
        defaultTime,
        ...restOption
      } = showTimeRef.current;
      const defaultTimeStart = defaultTime?.[0] || formatStartDate(format);
      const defaultTimeEnd = defaultTime?.[1] || formatEndDate(format);

      return [
        { format, defaultTime: defaultTimeStart, ...restOption },
        { format, defaultTime: defaultTimeEnd, ...restOption },
      ];
    }
    // default
    return [
      {
        format: TIME_FORMAT,
        defaultTime: DefaultStartTime,
      },
      {
        format: TIME_FORMAT,
        defaultTime: DefaultEndTime,
      },
    ];
  }, [showTimeRef]);

  return showTimeOption;
}

/**
 * 将showTime对象转化
 * @param showTime
 */
export function useShowTimeOption(
  showTime: IShowTime<string>
): IShowTimeOption<string> {
  const showTimeRef = React.useRef(showTime);

  const showTimeOption = React.useMemo(() => {
    if (!showTimeRef.current) {
      return undefined;
    }
    if (typeof showTimeRef.current === 'object') {
      const {
        format = TIME_FORMAT,
        defaultTime,
        ...restOption
      } = showTimeRef.current;
      const defaultTimeTemp = defaultTime || formatStartDate(format);
      return { format, defaultTime: defaultTimeTemp, ...restOption };
    }
    // default
    return {
      format: TIME_FORMAT,
      defaultTime: DefaultStartTime,
    };
  }, [showTimeRef]);

  return showTimeOption;
}
