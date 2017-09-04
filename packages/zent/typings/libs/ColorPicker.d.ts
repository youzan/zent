/// <reference types="react" />

declare module 'zent/lib/colorpicker' {
  interface IColorPickerProps {
    color: string
    showAlpha?: boolean
    type?: 'default'|'simple'
    presetColors?: Array<string>
    onChange?: (string) => any
    className?: string
    wrapperClassName?: string
    prefix?: string
  }

  class ColorPicker extends React.Component<IColorPickerProps, any> {}

  namespace ColorPicker {
    interface IColorBoardProps {
      color: string
      showAlpha?: boolean
      onChange?: (string) => any
      className?: string
      prefix?: string
    }

    class ColorBoard extends React.Component<IColorBoardProps, any> {}
  }

  export default ColorPicker
}
