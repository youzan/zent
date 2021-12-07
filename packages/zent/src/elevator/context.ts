import { createContext } from 'react';

export interface IElevatorContextProps {
  activeLink: string;
  offsetTop: number;
  onLinkClick: (link: string) => void;
  getContainer?: () => HTMLElement;
  onAnchorEnter: (link: string) => void;
  onAnchorLeave?: (link: string) => void;
  registerAnchor: (link: string, element: HTMLElement) => void;
}

export const ElevatorContext = createContext<IElevatorContextProps>(
  {} as IElevatorContextProps
);
