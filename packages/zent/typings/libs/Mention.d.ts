/// <reference types="react" />

declare module 'zent/lib/mention' {
  interface ICompoundMentionSuggestion {
    value: any
    content?: node
    isGroup?: boolean
    isDivider?: boolean
    icon?: string
    disabled?: boolean
  }

  interface IMentionProps {
    value: string;
    onChange: (string) => any;
    multiLine?: boolean;
    position?: 'top' | 'bottom';
    onSearchChange?: (string) => any;
    suggestions: string | number | ICompoundMentionSuggestion;
    suggestionNotFoundContent?: React.ReactNode;
    triggerText?: string;
    className?: string;
    prefix?: string;
  }

  export default class Mention extends React.Component<IMentionProps, any> {}
}
