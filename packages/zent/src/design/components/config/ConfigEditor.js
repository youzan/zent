/* eslint-disable no-script-url */

import React from 'react';
import Button from 'button';
import Input from 'input';
import ColorPicker from 'colorpicker';

import { DesignEditor, ControlGroup } from '../../editor/DesignEditor';
import { DEFAULT_BACKGROUND } from '../../preview/constants';

export default class ConfigEditor extends DesignEditor {
  render() {
    const { value, settings, prefix, showError, validation } = this.props;

    return (
      <div className={`${prefix}-design-component-config-editor`}>
        <ControlGroup
          showError={showError || this.getMetaProperty('title', 'touched')}
          error={validation.title}
          required
          label="页面名称:"
        >
          <Input
            value={value.title}
            onChange={this.onInputChange}
            onBlur={this.onInputBlur}
            name="title"
          />
        </ControlGroup>

        <ControlGroup
          showError={
            showError || this.getMetaProperty('description', 'touched')
          }
          error={validation.description}
          label="页面描述:"
        >
          <Input
            value={value.description}
            onChange={this.onInputChange}
            onBlur={this.onInputBlur}
            name="description"
            placeholder="用户通过微信分享给朋友时，会自动显示页面描述"
          />
        </ControlGroup>

        <ControlGroup
          label="背景颜色:"
          labelAlign="top"
          className={`${prefix}-design-component-config-editor__background`}
          focusOnLabelClick={false}
        >
          <div
            className={`${prefix}-design-component-config-editor__background-control`}
          >
            <ColorPicker
              color={getBackground(value, settings)}
              onChange={this.onBackgroundChange}
            />
            <Button onClick={this.resetBackground}>重置</Button>
          </div>
          <div
            className={`${prefix}-design-component-config-editor__background-hint`}
          >
            背景颜色只在手机端显示
          </div>
        </ControlGroup>
      </div>
    );
  }

  onColorChange = this.onCustomInputChange('color');

  onBackgroundChange = color => {
    // 修改 Config 组件的值
    this.onColorChange(color);

    // 修改 settings
    this.props.onSettingsChange({
      previewBackground: color,
    });
  };

  resetBackground = () => {
    this.onBackgroundChange(DEFAULT_BACKGROUND);
  };

  filterTag = (item, keyword) => item.text.indexOf(keyword) > -1;

  static designType = 'config';
  static designDescription = '页面配置';

  static getInitialValue() {
    return {
      // 标题
      title: '微页面标题',

      //  背景颜色
      color: '',

      // 页面描述
      description: '',
    };
  }

  static validate(value) {
    return new Promise(resolve => {
      const errors = {};
      const { title } = value;
      if (!title || !title.trim()) {
        errors.title = '请填写页面名称';
      } else if (title.length > 50) {
        errors.title = '页面名称长度不能多于 50 个字';
      }

      resolve(errors);
    });
  }
}

function getBackground(value, settings) {
  return (
    (value && value.color) || settings.previewBackground || DEFAULT_BACKGROUND
  );
}
