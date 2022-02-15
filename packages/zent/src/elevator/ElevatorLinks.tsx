import {
  VFC,
  ReactNode,
  MouseEvent,
  CSSProperties,
  useContext,
  useRef,
  useEffect,
} from 'react';
import cx from 'classnames';
import { ElevatorContext } from './context';
import { Affix, IAffixImperativeHandlers, IAffixProps } from '../affix';
import { WindowScrollHandler } from '..';

export interface IElevatorLinkItem {
  link: string;
  title: ReactNode;
}

export type IElevatorLinksProps = Omit<IAffixProps, 'className' | 'style'> & {
  links: IElevatorLinkItem[];
  className?: string;
  style?: CSSProperties;
  onClick?: (event: MouseEvent<HTMLDivElement>, link: string) => void;
};

export const ElevatorLinks: VFC<IElevatorLinksProps> = ({
  style,
  links,
  className,
  offsetTop,
  offsetBottom,
  onClick,
  ...restProps
}) => {
  const { activeLink, getContainer, onLinkClick } = useContext(ElevatorContext);
  const affixRef = useRef<IAffixImperativeHandlers>(null);

  useEffect(() => {
    const linkIds = links.map(link => link.link);
    if (Array.from(new Set(linkIds)).length !== linkIds.length) {
      console.warn(
        'Warning: In the links property of Elevator, the link value must be unique.'
      );
    }
  }, [links]);

  const handleScroll = () => {
    affixRef?.current?.updatePosition();
  };

  const handleLinkClick = (event: MouseEvent<HTMLDivElement>, link: string) => {
    onLinkClick(link);
    onClick?.(event, link);
  };

  return (
    <Affix
      offsetTop={offsetTop}
      offsetBottom={offsetBottom}
      getAffixContainer={getContainer}
      ref={affixRef}
      {...restProps}
    >
      <div
        className={cx('zent-elevator__links-wrapper', className)}
        style={style}
      >
        <div className="zent-elevator__links-content">
          {links.map(link => (
            <div
              key={link.link}
              onClick={e => handleLinkClick(e, link.link)}
              className={cx('zent-elevator__link', {
                'zent-elevator__link--active': activeLink === link.link,
              })}
            >
              {link.title}
            </div>
          ))}
        </div>
      </div>
      {getContainer && <WindowScrollHandler onScroll={handleScroll} />}
    </Affix>
  );
};
