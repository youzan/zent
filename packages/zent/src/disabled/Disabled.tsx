import * as React from 'react';

export interface IDisabledProps {
  value?: boolean;
}

export interface IDisabledContext {
  value: boolean;
}

export const DisabledContext = React.createContext<IDisabledContext>({
  value: false,
});

DisabledContext.displayName = 'DisabledContext';

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
    <DisabledContext.Provider value={ctx}>{children}</DisabledContext.Provider>
  );
};
