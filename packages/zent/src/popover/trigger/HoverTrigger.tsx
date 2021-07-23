import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { Subject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import Context from '../Context';
import Anchor, { PopoverAnchorGetElementFn } from '../Anchor';
import { addEventListener } from '../../utils/component/event-handler';
import { isElement, isFragment } from 'react-is';

export interface IHoverTriggerCompatibleProps {
  fixMouseEventsOnDisabledChildren?: boolean;
}

export type IPopoverHoverTriggerContext =
  Required<IHoverTriggerCompatibleProps>;

export const PopoverHoverTriggerContext =
  createContext<IPopoverHoverTriggerContext>({
    fixMouseEventsOnDisabledChildren: false,
  });

export interface IPopoverHoverTriggerChildProps {
  onMouseEnter?: (...args: any[]) => void;
  onMouseLeave?: (...args: any[]) => void;
}

export interface IPopoverHoverTriggerProps<
  ChildProps extends IPopoverHoverTriggerChildProps
> extends IHoverTriggerCompatibleProps {
  hideDelay?: number;
  showDelay?: number;
  anchorOnly?: boolean;
  getElement?: PopoverAnchorGetElementFn;
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
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error('PopoverHoverTrigger must be child of Popover');
  }

  const propsRef = useRef(props);
  propsRef.current = props;
  const visible$ = useMemo(() => new Subject<boolean>(), []);

  useEffect(() => {
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

  const { children, fixMouseEventsOnDisabledChildren = false } = props;
  const { portalRef, didMount } = ctx;

  didMount(() => {
    const { container } = portalRef.current;
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
      disposers.forEach(dispose => dispose());
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
  } else if (isElement(children) && !isFragment(children)) {
    const elem = children as React.ReactElement;
    child = cloneElement(elem, {
      onMouseEnter(...args: any[]) {
        elem.props.onMouseEnter?.(...args);
        visible$.next(true);
      },
      onMouseLeave(...args: any[]) {
        elem.props.onMouseLeave?.(...args);
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
  return (
    <PopoverHoverTriggerContext.Provider
      value={{ fixMouseEventsOnDisabledChildren }}
    >
      <Anchor getElement={props.getElement}>{child}</Anchor>
    </PopoverHoverTriggerContext.Provider>
  );
}

export default PopoverHoverTrigger;
