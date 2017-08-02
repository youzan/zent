import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

export default class NumberSteps extends (PureComponent || Component) {
  constructor(props) {
    super(props);
    this.state = {
      lastStepOffsetWidth: 0
    };
  }

  componentDidMount() {
    this.culcLastStepOffsetWidth();
  }

  componentDidUpdate() {
    this.culcLastStepOffsetWidth();
  }

  culcLastStepOffsetWidth = () => {
    const domNode = ReactDOM.findDOMNode(this);
    if (domNode.children.length > 0) {
      // +1 for fit edge bug of digit width, like 35.4px
      const lastStepOffsetWidth = domNode.lastChild.offsetWidth + 1;
      if (
        isNaN(lastStepOffsetWidth) ||
        this.state.lastStepOffsetWidth === lastStepOffsetWidth
      ) {
        return;
      }

      this.setState({ lastStepOffsetWidth });
    }
  };

  render() {
    const props = this.props;
    const { className, prefix, children, current, status } = props;
    const lastIndex = children.length - 1;
    const reLayouted = this.state.lastStepOffsetWidth > 0;
    const classString = classNames({
      [`${prefix}-steps`]: true,
      [`${className}`]: true
    });

    return (
      <div className={classString}>
        {React.Children.map(
          children,
          (item, index) => {
            const tailWidth =
              index === lastIndex || !reLayouted ? null : `${100 / lastIndex}%`;

            const adjustMarginRight =
              index === lastIndex
                ? null
                : -(this.state.lastStepOffsetWidth / lastIndex + 1);

            const np = {
              stepNumber: (index + 1).toString(),
              stepLast: index === lastIndex,
              isCurrentStep: index === current - 1,
              isLastFinishStep: status === 'error' && index === current - 2,
              tailWidth,
              adjustMarginRight,
              prefix,
              status: 'wait'
            };

            if (!item.props.status) {
              if (index === current - 1) {
                np.status = status;
              } else if (index < current - 1) {
                np.status = 'finish';
              } else {
                np.status = 'wait';
              }
            }

            return React.cloneElement(item, np);
          },
          this
        )}
      </div>
    );
  }
}
