import * as React from 'react';
import { Subject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import Context from '../Context';
import Anchor from '../Anchor';
import { addEventListener } from '../../utils/component/event-handler';
import { isElement } from 'react-is';
import { cloneElement } from 'react';

export interface IPopoverHoverTriggerChildProps {
  onMouseEnter?: (...args: any[]) => void;
  onMouseLeave?: (...args: any[]) => void;
}

export interface IPopoverHoverTriggerProps<
  ChildProps extends IPopoverHoverTriggerChildProps
> {
  hideDelay?: number;
  showDelay?: number;
  anchorOnly?: boolean;
  children?:
    | string
    | number
    | React.ReactElement<ChildProps, any>
    | ((childProps: IPopoverHoverTriggerChildProps) => React.ReactNode);
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
          return new Observable<boolean>(subscriber => {
            let timer: any = setTimeout(
              () => {
                subscriber.next(visible);
                subscriber.complete();
                timer = null;
              },
              visible ? showDelay : hideDelay
            );
            return () => {
              timer && clearTimeout(timer);
            };
          });
        })
      )
      .subscribe(visible => {
        ctx.popover.setVisible(visible);
      });
    return () => $.unsubscribe();
  }, [ctx.popover, visible$]);
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
    const disposers = [
      addEventListener(container, 'mouseenter', onMouseEnter),
      addEventListener(container, 'mouseleave', onMouseLeave),
      addEventListener(window, 'blur', onWindowBlur),
    ];
    return () => {
      disposers.forEach(disposer => disposer());
    };
  });
  let child: React.ReactNode;
  if (typeof children === 'function') {
    child = children({
      onMouseEnter() {
        visible$.next(true);
      },
      onMouseLeave() {
        visible$.next(false);
      },
    });
  } else if (isElement(children)) {
    child = cloneElement(children, {
      onMouseEnter(...args: any[]) {
        children.props.onMouseEnter?.(...args);
        visible$.next(true);
      },
      onMouseLeave(...args: any[]) {
        children.props.onMouseLeave?.(...args);
        visible$.next(false);
      },
    });
  } else {
    child = (
      <span
        onMouseEnter={() => visible$.next(true)}
        onMouseLeave={() => visible$.next(false)}
      >
        {children}
      </span>
    );
  }
  return <Anchor>{child}</Anchor>;
}

export default PopoverHoverTrigger;
