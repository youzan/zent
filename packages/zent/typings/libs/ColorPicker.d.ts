/// <reference types="react" />

declare module 'zent/lib/ColorPicker' {
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

  export class ColorPicker extends React.Component<IColorPickerProps, any> {}

  export namespace ColorPicker {
    interface IColorBoardProps {
      color: string
      showAlpha?: boolean
      onChange?: (string) => any
      className?: string
      prefix?: string
    }

    class ColorBoard extends React.Component<IColorBoardProps, any> {}
  }
}
