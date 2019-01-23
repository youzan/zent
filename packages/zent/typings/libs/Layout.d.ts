/// <reference types="react" />

declare module 'zent/lib/layout' {
  export namespace Layout {
    interface IResponsiveValue {
      // Fallback value when no breakpoint is matched
      fallback: number;

      // Breakpoints from bootstrap 4
      xs?: number; // width <576px
      sm?: number; // width ≥576px
      md?: number; // width ≥768px
      lg?: number; // width ≥992px
      xl?: number; // width ≥1200px

      // These breakpoints are not in bootstrap
      xxl?: number; // width ≥1600px;
      fhd?: number; // width ≥1920px;
    }

    interface ILayoutConfig {
      colGutter?: number | IResponsiveValue;
      rowGutter?: number | IResponsiveValue;
    }

    interface IGridProps {
      className?: string;
    }

    interface IRowProps {
      className?: string;
      justify?:
        | 'start'
        | 'center'
        | 'end'
        | 'space-around'
        | 'space-between'
        | 'space-evenly';
      align?: 'start' | 'center' | 'end';
    }

    interface IColProps {
      span: number | IResponsiveValue;
      offset?: number | IResponsiveValue;
      order?: number | IResponsiveValue;
      className?: string;
    }

    interface IConfigProviderProps {
      value: ILayoutConfig;
    }

    class Grid extends React.Component<IGridProps, any> {}
    class Row extends React.Component<IRowProps, any> {}
    class Col extends React.Component<IColProps, any> {}
    class ConfigProvider extends React.Component<IConfigProviderProps, any> {}
  }

  export default Layout;
}
