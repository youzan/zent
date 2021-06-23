// 由插件 plugins/postcss-generate-css-var-ref 遍历 'assets/theme/semantic/' 下scss文件生成
// 描述变量到 css variable 的一对多关系，便于获取变量所涵盖的 css variable，进行批量替换

export const cssVarRef = {
  '$text-600': ['--theme-title-color', '--theme-body-color'],
  '$text-500': ['--theme-hint-color', '--theme-weak-color'],
  '$text-400': [
    '--theme-disabled-color',
    '--theme-default-disabled-color',
    '--theme-default-disabled-border-color',
  ],
  '$text-200': [
    '--theme-section-bg',
    '--theme-default-selected',
    '--theme-default-disabled-bg',
  ],
  '$shadow-color': ['--theme-section-shadow'],
  '$text-300': ['--theme-section-border-color'],
  '$text-100': ['--theme-body-bg', '--theme-primary-color'],
  '$success-500': ['--theme-success-color', '--theme-success-border-color'],
  '$success-100': ['--theme-success-bg'],
  '$warning-500': ['--theme-warning-color', '--theme-warning-border-color'],
  '$warning-100': ['--theme-warning-bg'],
  '$danger-500': ['--theme-danger-color', '--theme-danger-border-color'],
  '$danger-100': ['--theme-danger-bg'],
  '$primary-500': [
    '--theme-link-color',
    '--theme-default-hover-color',
    '--theme-default-hover-border-color',
    '--theme-primary-bg',
    '--theme-primary-border-color',
  ],
  '$primary-400': [
    '--theme-link-hover-color',
    '--theme-primary-hover-bg',
    '--theme-primary-hover-border-color',
    '--theme-weak-hover-color',
  ],
  '$primary-600': [
    '--theme-link-active-color',
    '--theme-primary-active-bg',
    '--theme-primary-active-border-color',
    '--theme-weak-active-color',
  ],
  '$primary-100': ['--theme-default-hover-bg'],
  '$star-color': ['--theme-rate-bg'],
};
