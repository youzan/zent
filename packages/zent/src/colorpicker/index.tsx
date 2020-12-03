/**
 * This component is adapted from https://github.com/casesandberg/react-color.
 * See LICENSE for permissions.
 *
 * It's a modified Sketch color picker.
 */
import { PureComponent } from 'react';
import cx from 'classnames';
import ColorBoard from './ColorBoard';
import SketchPresetColors from './SketchPresetColors';
import Popover from '../popover';
import { DisabledContext, IDisabledContext } from '../disabled';

export type PresetColors = string[];
export type ColorPickerType = 'default' | 'simple';

const prefixCls = 'zent-color-picker';
export interface IColorPickerProps {
  color: string;
  showAlpha?: boolean;
  type?: ColorPickerType;
  presetColors?: PresetColors;
  onChange?: (color: string) => any;
  className?: string;
  wrapperClassName?: string;
  disabled?: boolean;
}

export class ColorPicker extends PureComponent<IColorPickerProps> {
  state = {
    popVisible: false,
  };

  static defaultProps = {
    showAlpha: false,
    onChange() {},
    className: '',
    wrapperClassName: '',
    type: 'default',
    presetColors: [
      '#FFFFFF',
      '#F8F8F8',
      '#F2F2F2',
      '#999999',
      '#444444',
      '#FF4444',
      '#FF6500',
      '#FF884D',
      '#FFCD00',
      '#3FBD00',
      '#3FBC87',
      '#00CD98',
      '#5197FF',
      '#BADCFF',
      '#FFEFB8',
    ],
  };

  static ColorBoard = ColorBoard;
  static contextType = DisabledContext;
  context!: IDisabledContext;

  get disabled() {
    const { disabled = this.context.value } = this.props;
    return disabled;
  }

  handleChange = color => {
    const { onChange, showAlpha } = this.props;
    let transColor = color;
    if (typeof color === 'object') {
      transColor = showAlpha ? color.rgba : color.hex;
    }
    onChange(transColor);
  };

  handleVisibleChange = visible => {
    if (this.disabled) {
      return;
    }
    this.setState({
      popVisible: visible,
    });
  };

  render() {
    const {
      color,
      showAlpha,
      className,
      wrapperClassName,
      type,
      presetColors,
    } = this.props;
    const { popVisible } = this.state;
    const openClassName = popVisible ? `${prefixCls}--open` : '';
    const backgroundColor = color;

    return (
      <Popover
        className={cx(`${prefixCls}-popover`, className)}
        position={Popover.Position.AutoBottomLeft}
        cushion={5}
        visible={popVisible}
        onVisibleChange={this.handleVisibleChange}
      >
        <Popover.Trigger.Click toggle>
          <div
            className={cx(prefixCls, wrapperClassName, openClassName, {
              [`${prefixCls}_disabled`]: this.disabled,
            })}
            tabIndex={0}
          >
            <div className={`${prefixCls}__text`}>
              <div
                className={`${prefixCls}__preview`}
                style={{ backgroundColor }}
              />
            </div>
          </div>
        </Popover.Trigger.Click>
        <Popover.Content>
          {type === 'simple' ? (
            <SketchPresetColors
              colors={presetColors}
              onClick={this.handleChange}
              type={type}
            />
          ) : (
            <ColorBoard
              color={color}
              showAlpha={showAlpha}
              onChange={this.handleChange}
              type={type}
            />
          )}
        </Popover.Content>
      </Popover>
    );
  }
}

export default ColorPicker;
