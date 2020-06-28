import * as React from 'react';

export default function useTimeValue(value: string) {
  const [timeValue, setTimevalue] = React.useState<string>(value);
  React.useEffect(() => {
    setTimevalue(value);
  }, [value]);

  return { timeValue, setTimevalue };
}
