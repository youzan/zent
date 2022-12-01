import { Component, PropsWithChildren } from 'react';
import { withRouter } from 'react-router-dom';
import type { RouteComponentProps } from 'react-router';

export type IScrollToTopProps = PropsWithChildren<RouteComponentProps>;

class ScrollToTop extends Component<IScrollToTopProps> {
  componentDidUpdate(prevProps: IScrollToTopProps) {
    if (this.props.location !== prevProps.location) {
      document.querySelector('.page-content')?.scrollTo(0, 0);
    }
  }

  render() {
    return <div className="app">{this.props.children}</div>;
  }
}

export default withRouter(ScrollToTop);
