import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Wrap, { INoticeWrapProps } from './Wrap';
import NoticeWrap from './Wrap';

export type NoticePositions =
  | 'right-top'
  | 'right-bottom'
  | 'left-top'
  | 'left-bottom';

const containers: Record<NoticePositions, NoticeContainer | null> = {
  'right-top': null,
  'right-bottom': null,
  'left-top': null,
  'left-bottom': null,
};

function createContainer(position: NoticePositions) {
  const div = document.createElement('div');
  div.classList.add('zent-notice-container');
  switch (position) {
    case 'right-top':
      div.classList.add(
        'zent-notice-container-right',
        'zent-notice-container-top'
      );
      break;
    case 'right-bottom':
      div.classList.add(
        'zent-notice-container-right',
        'zent-notice-container-bottom'
      );
      break;
    case 'left-top':
      div.classList.add(
        'zent-notice-container-left',
        'zent-notice-container-top'
      );
      break;
    case 'left-bottom':
      div.classList.add(
        'zent-notice-container-left',
        'zent-notice-container-bottom'
      );
      break;
    default:
      throw new Error(`Invalid argument ${position}`);
  }
  document.body.appendChild(div);
  return div;
}

type ContainerChild = React.ReactElement<INoticeWrapProps, typeof NoticeWrap>;

interface INoticeContainerProps {
  element: HTMLDivElement;
}

interface INoticeContainerState {
  list: readonly ContainerChild[];
}

let uniqueId = 0;

export const instanceMap = new Map<number, React.RefObject<Wrap>>();

class NoticeContainer extends React.Component<
  INoticeContainerProps,
  INoticeContainerState
> {
  state: INoticeContainerState = {
    list: [],
  };

  onExited = (id: number) => {
    this.setState(state => ({
      list: state.list.filter(it => it.props.id !== id),
    }));
  };

  push(children: React.ReactNode) {
    const id = uniqueId;
    const ref = React.createRef<Wrap>();
    const el = (
      <Wrap ref={ref} key={id} id={id} onExited={this.onExited}>
        {children}
      </Wrap>
    );
    uniqueId += 1;
    instanceMap.set(id, ref);
    this.setState(state => ({
      list: state.list.concat([el]),
    }));
    return id;
  }

  render() {
    return <>{this.state.list}</>;
  }
}

export function getContainer(position: NoticePositions): NoticeContainer {
  let container = containers[position];
  if (!container) {
    const div = createContainer(position);
    container = (ReactDOM.render(
      <NoticeContainer element={div} />,
      div
    ) as unknown) as NoticeContainer;
    containers[position] = container;
  }
  return container;
}

export function remove(id: number) {
  const ref = instanceMap.get(id);
  if (ref && ref.current) {
    ref.current.leave();
  }
}
