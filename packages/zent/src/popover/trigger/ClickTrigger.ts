import Trigger, { IPopoverTriggerProps } from './Trigger';
import { addEventListener } from '../../utils/component/event-handler';

export interface IPopoverClickTriggerProps extends IPopoverTriggerProps {
  autoClose?: boolean;
}

export default class PopoverClickTrigger<
  P extends IPopoverClickTriggerProps = IPopoverClickTriggerProps
> extends Trigger<P> {
  static defaultProps = {
    autoClose: true,
  };

  cancelEvent: () => void = null;

  onClickOutside = evt => {
    // Optimization: skip checking if popover is hidden
    const { contentVisible } = this.props;
    if (!contentVisible) {
      return;
    }

    const { target } = evt;
    if (this.props.isOutsideStacked(target)) {
      this.props.close();
    }
  };

  getTriggerProps(child) {
    return {
      onClick: evt => {
        this.props.open();
        this.triggerEvent(child, 'onClick', evt);
      },
    };
  }

  bindEventHandler(props?: IPopoverClickTriggerProps) {
    const { contentVisible, autoClose } = props || this.props;

    // bind global events only when popover is visible
    if (autoClose && contentVisible) {
      this.cancelEvent = addEventListener(
        window,
        'click',
        this.onClickOutside,
        {
          capture: true,
          passive: true,
        }
      );
      return;
    }

    // Ensure handler is removed even if autoClose is false
    if (!contentVisible) {
      this.cancelEvent?.();
    }
  }

  componentWillUnmount() {
    this.cancelEvent?.();
  }

  componentDidMount() {
    this.bindEventHandler();
  }

  componentWillReceiveProps(nextProps) {
    const { contentVisible } = nextProps;
    if (contentVisible !== this.props.contentVisible) {
      this.bindEventHandler(nextProps);
    }
  }
}
