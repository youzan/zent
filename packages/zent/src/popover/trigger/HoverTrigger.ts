import uniq from '../../utils/uniq';
import capitalize from '../../utils/capitalize';
import isBrowser from '../../utils/isBrowser';

import Trigger, { IPopoverTriggerProps } from './Trigger';
import { addEventListener } from '../../utils/component/event-handler';
import noop from '../../utils/noop';
import { runOnceInNextFrame } from '../../utils/nextFrame';

const MOUSE_EVENT_WHITE_LIST = [
  'down',
  'up',
  'move',
  'over',
  'out',
  'enter',
  'leave',
];

function isMouseEventSuffix(suffix: string) {
  return MOUSE_EVENT_WHITE_LIST.indexOf(suffix) !== -1;
}

// Hover识别的状态
enum HoverState {
  Init = 1,

  // Leave识别开始必须先由内出去
  Started = 2,

  // 延迟等待中
  Pending = 3,

  Finish = 255,
}

interface IState {
  name: string;
  transit: (state: HoverState) => void;
  is: (state: HoverState) => boolean;
}

interface IRecognizerOptions {
  local?: Record<'enter' | 'leave', () => void>;
  global?: Record<'move' | 'blur', (evt?: Event) => void>;
}

/**
 * 创建一个新state，每个state是一次性的，识别完成后需要创建一个新的state
 *
 * @param {string} name state的名称
 * @param {function} onFinish 识别成功时的回调函数
 */
const makeState = (
  name: string,
  onFinish: () => void,
  initState = HoverState.Init
): IState => {
  let state = initState;

  return {
    transit(nextState: HoverState) {
      // console.log(`${name}: ${state} -> ${nextState}`);

      state = nextState;

      if (state === HoverState.Finish) {
        onFinish();
      }
    },

    is(st: HoverState) {
      return st === state;
    },

    name,
  };
};

function installHooks(hooks: Record<string, () => void>) {
  if (!hooks) {
    return noop;
  }

  if (!isBrowser) {
    return noop;
  }

  const cancelList = Object.keys(hooks).map(hookName => {
    const eventName = isMouseEventSuffix(hookName)
      ? `mouse${hookName}`
      : hookName;
    return addEventListener(window, eventName, hooks[hookName], {
      capture: true,
    });
  });

  return () => {
    cancelList.forEach(cancel => cancel());
  };
}

function makeRecognizer(state: IState, options: IRecognizerOptions) {
  const cancelHooks = installHooks(options.global);
  const recognizer = {
    ...options,

    destroy() {
      if (!state.is(HoverState.Finish)) {
        recognizer.uninstall();

        // console.log(`destroy ${state.name}`);
      }
    },

    uninstall() {
      cancelHooks();
    },
  };

  return recognizer;
}

/**
 * 进入和离开的识别是独立的recognizer，每个recognizer可以绑定任意`onmouse***`事件。
 * 组件内部只需要提供识别完成后的回调函数，不需要知道recognizer的细节。
 *
 * local下的事件是直接绑定在trigger上的
 * global下的事件是绑定在window上的capture事件
 */

/**
 * 进入状态的识别
 */
function makeHoverEnterRecognizer({
  enterDelay,
  onEnter,
}: {
  enterDelay: number;
  onEnter: () => void;
}) {
  const state = makeState('enter', onEnter);
  let timerId: number;

  const recognizer = makeRecognizer(state, {
    local: {
      enter() {
        state.transit(HoverState.Pending);

        timerId = window.setTimeout(() => {
          state.transit(HoverState.Finish);
          recognizer.uninstall();
        }, enterDelay);
      },

      leave() {
        if (timerId) {
          clearTimeout(timerId);
          timerId = undefined;

          state.transit(HoverState.Init);
        }
      },
    },
  });

  return recognizer;
}

/**
 * 离开状态的识别
 */
function makeHoverLeaveRecognizer({
  leaveDelay,
  onLeave,
  isOutSide,
  quirk,
}: {
  leaveDelay: number;
  onLeave: () => void;
  isOutSide: (target: EventTarget) => boolean;
  quirk: boolean;
}) {
  const state = makeState('leave', onLeave);
  let timerId;

  const gotoFinishState = () => {
    state.transit(HoverState.Finish);
    recognizer.uninstall();
  };

  const recognizer = makeRecognizer(state, {
    global: {
      move: runOnceInNextFrame(evt => {
        const { target } = evt;

        if (isOutSide(target)) {
          if (!quirk && !state.is(HoverState.Started)) {
            return;
          }

          state.transit(HoverState.Pending);

          timerId = setTimeout(gotoFinishState, leaveDelay);
        } else {
          if (state.is(HoverState.Init)) {
            state.transit(HoverState.Started);
            return;
          }

          if (!state.is(HoverState.Pending)) {
            return;
          }

          if (timerId) {
            clearTimeout(timerId);
            timerId = undefined;

            state.transit(HoverState.Started);
          }
        }
      }),

      // 页面失去焦点的时候强制关闭，否则会出现必须先移动进来再出去才能关闭的问题
      blur: evt => {
        // 确保事件来自 window
        // React 的事件系统会 bubble blur事件，但是原生的是不会 bubble 的。
        // https://github.com/facebook/react/issues/6410#issuecomment-292895495
        const { target } = evt;
        if (target !== window) {
          return;
        }

        if (timerId) {
          clearTimeout(timerId);
          timerId = undefined;
        }

        gotoFinishState();
      },
    },
  });

  return recognizer;
}

function callHook(recognizer, namespace, hookName, ...args) {
  const ns = recognizer && recognizer[namespace];
  if (ns && ns[hookName]) ns[hookName](...args);
}

function destroyRecognizer(recognizer) {
  if (recognizer) {
    recognizer.destroy();
  }
}

export interface IPopoverHoverTriggerProps extends IPopoverTriggerProps {
  hideDelay: number;
  quirk?: boolean;
  showDelay: number;
}

export default class PopoverHoverTrigger<
  P extends IPopoverHoverTriggerProps = IPopoverHoverTriggerProps
> extends Trigger<P> {
  static defaultProps = {
    showDelay: 150,
    hideDelay: 150,
    quirk: false,
  };

  open = () => {
    this.props.open();
  };

  close = () => {
    this.props.close();
  };

  state = {
    enterRecognizer: null,
    leaveRecognizer: null,
  };

  makeEnterRecognizer() {
    const { showDelay } = this.props;

    return makeHoverEnterRecognizer({
      enterDelay: showDelay,
      onEnter: this.open,
    });
  }

  makeLeaveRecognizer() {
    const { quirk, hideDelay, isOutsideStacked } = this.props;

    return makeHoverLeaveRecognizer({
      leaveDelay: hideDelay,
      onLeave: this.close,
      isOutSide: isOutsideStacked,
      quirk,
    });
  }

  getTriggerProps(child) {
    const { enterRecognizer, leaveRecognizer } = this.state;
    const enterHooks = (enterRecognizer && enterRecognizer.local) || {};
    const leaveHooks = (leaveRecognizer && leaveRecognizer.local) || {};
    const eventNames = uniq(
      [].concat(Object.keys(enterHooks), Object.keys(leaveHooks))
    ).map(name => `onMouse${capitalize(name)}`);
    const eventNameToHookName = eventName =>
      eventName.slice('onMouse'.length).toLowerCase();

    return eventNames.reduce((events, evtName) => {
      const hookName = eventNameToHookName(evtName);
      events[evtName] = evt => {
        callHook(enterRecognizer, 'local', hookName);
        callHook(leaveRecognizer, 'local', hookName);

        this.triggerEvent(child, evtName, evt);
      };

      return events;
    }, {});
  }

  cleanup() {
    // ensure global events are removed
    destroyRecognizer(this.state.enterRecognizer);
    destroyRecognizer(this.state.leaveRecognizer);
  }

  initRecognizers(props?: any) {
    props = props || this.props;
    const { contentVisible } = props;

    this.cleanup();
    this.setState({
      enterRecognizer: contentVisible ? null : this.makeEnterRecognizer(),
      leaveRecognizer: contentVisible ? this.makeLeaveRecognizer() : null,
    });
  }

  componentWillUnmount() {
    this.cleanup();
  }

  componentDidMount() {
    this.initRecognizers();
  }

  componentWillReceiveProps(nextProps) {
    const { contentVisible } = nextProps;

    // visibility changed, create new recognizers
    if (contentVisible !== this.props.contentVisible) {
      this.initRecognizers(nextProps);
    }
  }
}
