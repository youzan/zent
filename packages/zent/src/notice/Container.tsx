import { Component, createRef } from 'react';
import * as ReactDOM from 'react-dom';
import Wrap, { INoticeWrapProps } from './Wrap';
import createElement from '../utils/dom/createElement';

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

const pendingNotice = {
  'right-top': new Set<(container: NoticeContainer) => void>(),
  'right-bottom': new Set<(container: NoticeContainer) => void>(),
  'left-top': new Set<(container: NoticeContainer) => void>(),
  'left-bottom': new Set<(container: NoticeContainer) => void>(),
};

function createContainer(position: NoticePositions) {
  const div = createElement('div');
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

type ContainerChild = React.ReactElement<INoticeWrapProps, typeof Wrap>;

interface INoticeContainerProps {
  element: HTMLDivElement;
}

interface INoticeContainerState {
  list: readonly ContainerChild[];
}

export const instanceMap = new Map<string, React.RefObject<Wrap>>();

class NoticeContainer extends Component<
  INoticeContainerProps,
  INoticeContainerState
> {
  state: INoticeContainerState = {
    list: [],
  };

  onExited = (id: string) => {
    this.setState(state => ({
      list: state.list.filter(it => it.props.id !== id),
    }));
  };

  push(children: React.ReactNode, id: string) {
    const ref = createRef<Wrap>();
    const el = (
      <Wrap ref={ref} key={id} id={id} onExited={this.onExited}>
        {children}
      </Wrap>
    );
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

export function getContainer(
  position: NoticePositions,
  ready: (container: NoticeContainer) => void
): void {
  const container = containers[position];
  if (container) {
    return ready(container);
  }

  const pending = pendingNotice[position];
  pending.add(ready);

  // Container is creating
  if (pending.size > 1) {
    return;
  }

  const div = createContainer(position);
  // Don't use its return value since ReactDOM.render is not guaranteed to be sync
  ReactDOM.render(
    <NoticeContainer
      element={div}
      ref={node => {
        if (node) {
          containers[position] = node;

          // Invoke all pending ready callbacks
          pending.forEach(cb => cb(node));
          pending.clear();
        }
      }}
    />,
    div
  );
}

export function remove(id: string) {
  const ref = instanceMap.get(id);
  if (ref && ref.current) {
    ref.current.leave();
  }
}
