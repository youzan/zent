/// <reference types="react" />

declare module 'zent/lib/mention' {
  interface ICompoundMentionSuggestion {
    value: any
    content?: any
    isGroup?: boolean
    isDivider?: boolean
    icon?: string
    disabled?: boolean
  }

  interface IMentionProps {
    value: string;
    onChange: (string: string) => any;
    multiLine?: boolean;
    position?: 'top' | 'bottom';
    onSearchChange?: (string: string) => any;
    suggestions: string | number | ICompoundMentionSuggestion;
    suggestionNotFoundContent?: React.ReactNode;
    triggerText?: string;
    className?: string;
    prefix?: string;
  }

  export default class Mention extends React.Component<IMentionProps, any> {}
}
