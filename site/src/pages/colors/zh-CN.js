import React from 'react';

import Colors from './colors';

const palettes = {
  primary: {
    title: '主色',
    desc: <p>Zent 默认的主色调是蓝色。</p>
  },
  neutral: {
    title: '中性色',
    desc: <p>主要用于文字、背景、边框等地方。</p>
  },
  auxiliary: {
    success: {
      title: '辅助色 - 成功'
    },
    warning: {
      title: '辅助色 - 警告'
    },
    notice: {
      title: '辅助色 - 醒目提示'
    },
    error: {
      title: '辅助色 - 错误'
    },
    others: {
      title: '辅助色 - 其他',
      desc: <p>主要用于蒙层或者阴影。</p>
    }
  }
};

export default function ColorsCN() {
  return (
    <Colors
      title="色彩"
      desc={
        <p>
          Zent 使用了一套调色板来统一整个组件库的视觉样式，除了默认的色彩之外，可以通过<a href="theme">定制主题</a>的方式实现自定义配色。
        </p>
      }
      palettes={palettes}
    />
  );
}
