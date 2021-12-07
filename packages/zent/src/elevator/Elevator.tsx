import { FC, useCallback, useMemo, useState } from 'react';
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
  defaultActiveLink?: string;
  onChange?: (currentLink: string, previousLink: string) => void;
}

type IElevator = FC<IElevatorProps> & {
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
}) => {
  const getContainerResult = getContainer?.();
  const [activeLink, setActiveLink] = useState<string>(defaultActiveLink || '');
  const [anchorElementsMap, setAnchorElementsMap] = useState<
    Map<string, HTMLElement>
  >(new Map());

  const handleAnchorEnter = (link: string) => {
    setActiveLink(link);
    onChange?.(link, activeLink);
  };

  const offsetTop = useMemo(() => {
    let containerHeight = getDefaultContainer().innerHeight;
    if (getContainerResult) {
      containerHeight = getContainerResult.getBoundingClientRect().height;
    }
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

  const handleLinkClick = (link: string) => {
    const el = anchorElementsMap.get(link);
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

    smoothScroll(container, scrollLeft, scrollTopTarget, SCROLL_DURATION);
  };

  return (
    <ElevatorContext.Provider
      value={{
        activeLink,
        offsetTop,
        getContainer,
        onLinkClick: handleLinkClick,
        onAnchorEnter: handleAnchorEnter,
        registerAnchor: handleRegisterAnchor,
      }}
    >
      {children}
    </ElevatorContext.Provider>
  );
};

Elevator.Links = ElevatorLinks;
Elevator.Anchor = ElevatorAnchor;

export default Elevator;
