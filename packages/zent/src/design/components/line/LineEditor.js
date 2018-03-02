import React from 'react';
import Radio from 'radio';
import ColorPicker from 'colorpicker';

import { DesignEditor, ControlGroup } from '../../editor/DesignEditor';

const RadioGroup = Radio.Group;
const DEFAULT_COLOR = '#e5e5e5';

export default class LineEditor extends DesignEditor {
  render() {
    const { prefix, value, showError, validation } = this.props;

    return (
      <div className={`${prefix}-design-component-line-editor`}>
        <ControlGroup
          label="颜色:"
          showError={showError || this.getMetaProperty('content', 'touched')}
          error={validation.content}
        >
          <ColorPicker
            className={`${prefix}-design-component-line-editor_color-select`}
            color={value.color}
            onChange={this.onColorChange}
          />
          <span
            className={`${prefix}-design-component-line-editor_color-reset`}
            onClick={this.onColorReset}
          >
            重置
          </span>
        </ControlGroup>
        <ControlGroup
          label="边距:"
          showError={showError || this.getMetaProperty('content', 'touched')}
          error={validation.content}
        >
          <RadioGroup value={value.hasPadding} onChange={this.onInputChange}>
            <Radio name="hasPadding" value={false}>
              无边距
            </Radio>
            <Radio name="hasPadding" value>
              左右留边
            </Radio>
          </RadioGroup>
        </ControlGroup>
        <ControlGroup
          label="样式:"
          showError={showError || this.getMetaProperty('content', 'touched')}
          error={validation.content}
        >
          <RadioGroup value={value.lineType} onChange={this.onInputChange}>
            <Radio name="lineType" value="solid">
              实线
            </Radio>
            <Radio name="lineType" value="dashed">
              虚线
            </Radio>
            <Radio name="lineType" value="dotted">
              点线
            </Radio>
          </RadioGroup>
        </ControlGroup>
      </div>
    );
  }

  onColorChange = this.onCustomInputChange('color');

  onColorReset = () => {
    this.onColorChange(DEFAULT_COLOR);
  };

  static designType = 'line';
  static designDescription = '辅助线';

  static getInitialValue() {
    return {
      color: DEFAULT_COLOR,
      hasPadding: false,
      lineType: 'solid',
    };
  }
}
