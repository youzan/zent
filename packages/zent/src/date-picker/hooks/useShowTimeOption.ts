import * as React from 'react';
import { startOfToday, endOfToday } from 'date-fns';
import { formatDate } from '../utils/index';
import { IShowTime, IShowTimeOption } from '../types';
const DefaultTime = 'HH:mm:ss';

/**
 * 获取showTime范围
 * @param showTime
 */
export function useShowTimeRange<T>(showTime: IShowTime<T>) {
  const showTimeRef = React.useRef(showTime);

  const showTimeOption = React.useMemo(() => {
    if (typeof showTimeRef?.current !== 'object') {
      return [{}, {}];
    }
    const {
      format = DefaultTime,
      defaultTime,
    } = showTimeRef?.current as IShowTimeOption<T>;
    const defaultTimeStart =
      (defaultTime && defaultTime[0]) || formatDate(startOfToday(), format);
    const defaultTimeEnd =
      (defaultTime && defaultTime[1]) || formatDate(endOfToday(), format);

    return [
      { format, defaultTime: defaultTimeStart },
      { format, defaultTime: defaultTimeEnd },
    ];
  }, [showTimeRef]);
  return showTimeOption as IShowTimeOption<string>[];
}

/**
 * 将showTime对象转化
 * @param showTime
 */
export function useShowTimeOption<T>(showTime: IShowTime<T>) {
  const showTimeOption = React.useMemo(() => {
    if (typeof showTime !== 'object') {
      return { format: DefaultTime, defaultTime: null };
    }
    const { format = DefaultTime, defaultTime } = showTime as IShowTimeOption<
      T
    >;
    const defaultTimeTemp = defaultTime || formatDate(startOfToday(), format);

    return { format, defaultTime: defaultTimeTemp };
  }, [showTime]);
  return showTimeOption as IShowTimeOption<T>;
}
