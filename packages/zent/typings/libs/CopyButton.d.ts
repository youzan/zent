/// <reference types="react" />

declare module 'zent/lib/copy-button' {
  interface ICopyButtonProps {
    text: string
    onCopySuccess?: () => void | string
    onCopyError?: () => void | string
  }

  export default class CopyButton extends React.Component<ICopyButtonProps, any> {}
}
