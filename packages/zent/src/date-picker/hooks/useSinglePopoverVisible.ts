import * as React from 'react';
import { useEventCallbackRef } from '../../utils/hooks/useEventCallbackRef';

export default function useSinglePopoverVisible(
  openPanel,
  disabled,
  defaultSelected,
  setSelected,
  onOpen,
  onClose
) {
  const [panelVisible, setPanelVisible] = React.useState<boolean>(
    openPanel ?? undefined
  );
  const onOpenRef = useEventCallbackRef(onOpen);
  const onCloseRef = useEventCallbackRef(onClose);
  const defaultSelectedRef = React.useRef(defaultSelected);
  defaultSelectedRef.current = defaultSelected;

  React.useEffect(() => {
    setPanelVisible(openPanel ?? undefined);
  }, [openPanel]);

  const onVisibleChange = React.useCallback(() => {
    if (openPanel !== undefined || disabled) return;
    setPanelVisible(!panelVisible);
  }, [panelVisible, openPanel, disabled]);

  const mounted = React.useRef<boolean>();
  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (panelVisible) {
        onOpenRef.current?.();
      } else {
        setSelected(defaultSelectedRef.current);
        onCloseRef.current?.();
      }
    }
  }, [panelVisible, defaultSelectedRef, onOpenRef, onCloseRef, setSelected]);

  return { panelVisible, setPanelVisible, onVisibleChange };
}
