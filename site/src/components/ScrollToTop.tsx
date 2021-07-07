import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import type { RouteComponentProps } from 'react-router';

export type IScrollToTopProps = RouteComponentProps;

class ScrollToTop extends Component<IScrollToTopProps> {
  componentDidUpdate(prevProps: IScrollToTopProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return <div className="app">{this.props.children}</div>;
  }
}

export default withRouter(ScrollToTop);
