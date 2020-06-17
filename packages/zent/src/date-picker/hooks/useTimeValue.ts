import * as React from 'react';

export default function useTimeValue(selected: string) {
  const [timeValue, setTimevalue] = React.useState<string>(selected);
  React.useEffect(() => {
    setTimevalue(selected);
  }, [selected]);

  return { timeValue, setTimevalue };
}
