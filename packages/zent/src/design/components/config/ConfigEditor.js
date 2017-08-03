/* eslint-disable no-script-url */

import React from 'react';
import Button from 'button';
import Input from 'input';
import ColorPicker from 'colorpicker';

import { DesignEditor, ControlGroup } from '../../editor/DesignEditor';

const DEFAULT_BACKGROUND = '#f9f9f9';

export default class ConfigEditor extends DesignEditor {
  constructor(props) {
    super(props);

    const { design } = this.props;
    design.injections.getPreviewProps(this.getPreviewProps);
  }

  render() {
    const { value, prefix, showError, validation } = this.props;

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
              color={getBackground(value)}
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
    // 因为外层会在组件刷新前调用getPreviewBgColor方法，所以缓存起来
    this.cachedBackground = color;
    this.onColorChange(color);
  };

  resetBackground = () => {
    this.onBackgroundChange(DEFAULT_BACKGROUND);
  };

  getPreviewProps = () => {
    const { value } = this.props;
    const bg = this.cachedBackground || getBackground(value);
    this.cachedBackground = undefined;

    return {
      background: bg
    };
  };

  filterTag = (item, keyword) => item.text.indexOf(keyword) > -1;

  static designType = 'config';
  static designDescription = '页面配置';

  static getInitialValue() {
    return {
      // 标题
      title: '微页面标题',

      //  背景颜色
      color: DEFAULT_BACKGROUND,

      // 页面描述
      description: ''
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

function getBackground(value) {
  return (value && value.color) || DEFAULT_BACKGROUND;
}
