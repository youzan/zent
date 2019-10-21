import * as React from 'react';
import { isElement } from 'react-is';
import { Subject, of } from 'rxjs';
import { switchMap, delay } from 'rxjs/operators';
import Context from '../Context';
import Anchor from '../Anchor';

export interface IPopoverHoverTriggerChildProps {
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
}

export interface IPopoverHoverTriggerProps<
  ChildProps extends IPopoverHoverTriggerChildProps
> {
  hideDelay?: number;
  showDelay?: number;
  anchorOnly?: boolean;
  children?: string | number | React.ReactElement<ChildProps, any>;
}

/**
 * @todo better enter/leave algorithm
 */
export function PopoverHoverTrigger<
  ChildProps extends IPopoverHoverTriggerChildProps = IPopoverHoverTriggerChildProps
>(props: IPopoverHoverTriggerProps<ChildProps>) {
  const ctx = React.useContext(Context);
  if (!ctx) {
    throw new Error('PopoverHoverTrigger must be child of Popover');
  }
  const propsRef = React.useRef(props);
  propsRef.current = props;
  const visible$ = React.useMemo(() => new Subject<boolean>(), []);
  React.useEffect(() => {
    const $ = visible$
      .pipe(
        switchMap(visible => {
          const { hideDelay = 150, showDelay = 150 } = propsRef.current;
          return of(visible).pipe(delay(visible ? showDelay : hideDelay));
        })
      )
      .subscribe(visible => {
        ctx.popover.setVisible(visible);
      });
    return () => $.unsubscribe();
  }, []);
  const { children } = props;
  const { portalRef, didMount } = ctx;
  didMount(() => {
    const { container } = portalRef.current!;
    function onMouseEnter() {
      const { anchorOnly } = propsRef.current;
      if (anchorOnly) {
        return;
      }
      visible$.next(true);
    }
    function onMouseLeave() {
      const { anchorOnly } = propsRef.current;
      if (anchorOnly) {
        return;
      }
      visible$.next(false);
    }
    function onWindowBlur() {
      visible$.next(false);
    }
    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('blur', onWindowBlur);
    return () => {
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('blur', onWindowBlur);
    };
  });
  const child = React.useMemo(() => {
    if (isElement(children)) {
      return React.cloneElement(children, {
        onMouseEnter(e: any) {
          const {
            onMouseEnter,
          } = children.props as IPopoverHoverTriggerChildProps;
          onMouseEnter && onMouseEnter(e);
          visible$.next(true);
        },
        onMouseLeave(e: any) {
          const {
            onMouseLeave,
          } = children.props as IPopoverHoverTriggerChildProps;
          onMouseLeave && onMouseLeave(e);
          visible$.next(false);
        },
      });
    }
    return (
      <span
        onMouseEnter={() => visible$.next(true)}
        onMouseLeave={() => visible$.next(false)}
      >
        {children}
      </span>
    );
  }, [children]);
  return <Anchor>{child}</Anchor>;
}

export default PopoverHoverTrigger;
