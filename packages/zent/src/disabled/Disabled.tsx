import * as React from 'react';

export interface IDisabledProps {
  value?: boolean;
}

export interface IDisabledContext {
  value: boolean;
}

export const DisabledCotnext = React.createContext<IDisabledContext>({
  value: false,
});

DisabledCotnext.displayName = 'DisabledCotnext';

export const Disabled: React.FunctionComponent<IDisabledProps> = ({
  value = true,
  children,
}) => {
  const ctx = React.useMemo(
    () => ({
      value,
    }),
    [value]
  );
  return (
    <DisabledCotnext.Provider value={ctx}>{children}</DisabledCotnext.Provider>
  );
};
