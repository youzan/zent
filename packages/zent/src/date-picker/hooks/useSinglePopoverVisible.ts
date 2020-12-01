import { useCallback, useEffect, useRef, useState } from 'react';
import { useEventCallbackRef } from '../../utils/hooks/useEventCallbackRef';

export default function useSinglePopoverVisible<DateType>(
  defaultSelected: DateType,
  setSelected: React.Dispatch<React.SetStateAction<DateType>>,
  onOpen: () => void,
  onClose: () => void,
  disabled?: boolean,
  openPanel?: boolean
) {
  const [panelVisible, setPanelVisible] = useState<boolean>(openPanel ?? false);
  const onOpenRef = useEventCallbackRef(onOpen);
  const onCloseRef = useEventCallbackRef(onClose);
  const defaultSelectedRef = useRef<DateType>(defaultSelected);
  defaultSelectedRef.current = defaultSelected;

  useEffect(() => {
    setPanelVisible(openPanel ?? false);
  }, [openPanel]);

  const onVisibleChange = useCallback(() => {
    if (openPanel !== undefined || disabled) return;
    setPanelVisible(!panelVisible);
  }, [panelVisible, openPanel, disabled]);

  const mounted = useRef<boolean>();
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (panelVisible) {
        onOpenRef?.current?.();
      } else {
        setSelected(defaultSelectedRef.current);
        onCloseRef?.current?.();
      }
    }
  }, [panelVisible, defaultSelectedRef, onOpenRef, onCloseRef, setSelected]);

  return { panelVisible, setPanelVisible, onVisibleChange };
}
