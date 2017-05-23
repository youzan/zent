import React, { Component } from 'react';
import cx from 'classnames';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import getElementViewTop from './utils/getElementViewTop';
import getElementViewBottom from './utils/getElementViewBottom';

class Affix extends Component {
  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    zIndex: PropTypes.number,
    offsetTop: PropTypes.number,
    offsetBottom: PropTypes.number,
    onFixed: PropTypes.func,
    outFixed: PropTypes.func
  };

  static defaultProps = {
    offsetTop: 0,
    prefix: 'zent',
    zIndex: 10
  };

  constructor(props) {
    super(props);
    this.state = {
      affix: false,
      affixStyle: { zIndex: props.zIndex },
      placeHoldStyle: null
    };
  }

  handleScroll = () => {
    const affix = this.state.affix;
    const props = this.props;
    const element = ReactDOM.findDOMNode(this);

    if (props.offsetBottom !== undefined) {
      const elementViewBottom = getElementViewBottom(element);
      if (!affix && elementViewBottom < props.offsetBottom) {
        props.onFixed && props.onFixed();
        this.setState({
          affix: true,
          affixStyle: {
            zIndex: props.zIndex,
            bottom: props.offsetBottom,
            width: element.offsetWidth,
            position: 'fixed'
          },
          placeHoldStyle: {
            width: element.offsetWidth,
            height: element.offsetHeight
          }
        });
      }
      if (affix && elementViewBottom > props.offsetBottom) {
        props.outFixed && props.outFixed();
        this.setState({ affix: false, affixStyle: null, placeHoldStyle: null });
      }
    } else {
      const elementViewTop = getElementViewTop(element);
      const offsetTop = props.offsetTop;
      if (!affix && elementViewTop < offsetTop) {
        props.onFixed && props.onFixed();
        this.setState({
          affix: true,
          affixStyle: {
            zIndex: props.zIndex,
            top: offsetTop,
            width: element.offsetWidth,
            position: 'fixed'
          },
          placeHoldStyle: {
            width: element.offsetWidth,
            height: element.offsetHeight
          }
        });
      }
      if (affix && elementViewTop > offsetTop) {
        props.outFixed && props.outFixed();
        this.setState({ affix: false, affixStyle: null, placeHoldStyle: null });
      }
    }
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const { prefix, className } = this.props;
    const wrapClass = cx(`${prefix}-affix`, className);
    return (
      <div style={this.state.placeHoldStyle}>
        <div className={wrapClass} style={this.state.affixStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Affix;
