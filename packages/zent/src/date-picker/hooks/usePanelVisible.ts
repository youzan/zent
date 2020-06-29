import * as React from 'react';
/**
 * panelVisible
 * @param openPanel {boolean}
 */
export default function usePanelVisible(openPanel) {
  const [panelVisible, setPanelVisible] = React.useState<boolean>(
    openPanel ?? undefined
  );
  React.useEffect(() => {
    setPanelVisible(openPanel ?? undefined);
  }, [openPanel]);
  return { panelVisible, setPanelVisible };
}
