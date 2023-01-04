import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import isNil from '../utils/isNil';
import { smoothScroll } from '../utils/scroll';
import { ElevatorContext } from './context';
import { ElevatorAnchor } from './ElevatorAnchor';
import { ElevatorLinks } from './ElevatorLinks';

const SCROLL_DURATION = 200;

export interface IElevatorProps {
  getContainer?: () => HTMLElement;
  targetOffset?: number;
  offsetTop?: number;
  activeLink?: string;
  defaultActiveLink?: string;
  onChange?: (currentLink: string, previousLink: string) => void;
}

type IElevator = FC<PropsWithChildren<IElevatorProps>> & {
  Links: typeof ElevatorLinks;
  Anchor: typeof ElevatorAnchor;
};

const getDefaultContainer = () => window;

export const Elevator: IElevator = ({
  children,
  onChange,
  targetOffset,
  getContainer,
  defaultActiveLink,
  offsetTop: propOffsetTop,
  activeLink: propActiveLink,
}) => {
  const getContainerResult = getContainer?.();
  const [anchorElementsMap, setAnchorElementsMap] = useState<
    Map<string, HTMLElement>
  >(new Map());
  const [internalActiveLink, setInternalActiveLink] = useState<string>('');
  const activeLink = useMemo(
    () => (!isNil(propActiveLink) ? propActiveLink : internalActiveLink),
    [propActiveLink, internalActiveLink]
  );
  const isScrolling = useRef(false);

  const handleAnchorEnter = (link: string) => {
    setInternalActiveLink(link);
    if (isScrolling.current || link === activeLink) return;
    onChange?.(link, activeLink);
  };

  // 计算activeLink切换的锚点偏移量
  const offsetTop = useMemo(() => {
    let containerHeight = getDefaultContainer().innerHeight;
    if (getContainerResult) {
      containerHeight = getContainerResult.getBoundingClientRect().height;
    }
    // 默认偏移量为container高度的一半
    const defaultOffsetTop = containerHeight / 2;
    return !isNil(propOffsetTop)
      ? containerHeight - (propOffsetTop || 1)
      : defaultOffsetTop;
  }, [propOffsetTop, getContainerResult]);

  const handleRegisterAnchor = useCallback((link: string, el: HTMLElement) => {
    setAnchorElementsMap(prev => {
      const map = new Map(prev);
      map.set(link, el);
      return map;
    });
  }, []);

  const handleUnRegister = useCallback((link: string) => {
    setAnchorElementsMap(prev => {
      const map = new Map(prev);
      map.delete(link);
      return map;
    });
  }, []);

  const handleScrollToLink = (link: string, controlled = false) => {
    const el = anchorElementsMap.get(link);
    if (!el) return;
    const bounds = el.getBoundingClientRect();
    let container: HTMLElement | Window = getDefaultContainer();
    let containerTop = 0;
    let scrollTop = container.scrollY;
    let scrollLeft = container.scrollX;
    if (getContainerResult) {
      container = getContainerResult;
      const containerBounds = container.getBoundingClientRect();
      containerTop = containerBounds.top;
      scrollTop = container.scrollTop;
      scrollLeft = container.scrollLeft;
    }

    const scrollTopTarget =
      bounds.top - containerTop + scrollTop - (targetOffset || 0);

    isScrolling.current = true;
    smoothScroll(container, scrollLeft, scrollTopTarget, SCROLL_DURATION).then(
      () => {
        isScrolling.current = false;
        !controlled && onChange?.(link, activeLink);
      }
    );
  };

  const handleLinkClick = (link: string) => {
    if (isNil(propActiveLink)) {
      handleScrollToLink(link);
    } else if (link !== activeLink) {
      onChange?.(link, activeLink);
    }
  };

  useEffect(() => {
    if (!isNil(propActiveLink) && propActiveLink !== internalActiveLink) {
      handleScrollToLink(propActiveLink, true);
    }

    if (isNil(propActiveLink) && defaultActiveLink) {
      handleScrollToLink(defaultActiveLink);
    }
    // 受控状态下仅在外部传入的 activeLink 改变时触发滚动
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propActiveLink, anchorElementsMap, defaultActiveLink]);

  return (
    <ElevatorContext.Provider
      value={{
        activeLink,
        offsetTop,
        getContainer,
        onLinkClick: handleLinkClick,
        onAnchorEnter: handleAnchorEnter,
        registerAnchor: handleRegisterAnchor,
        unRegisterAnchor: handleUnRegister,
      }}
    >
      {children}
    </ElevatorContext.Provider>
  );
};

Elevator.Links = ElevatorLinks;
Elevator.Anchor = ElevatorAnchor;

export default Elevator;
