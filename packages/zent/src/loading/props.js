import PropTypes from 'prop-types';

const BasePropTypes = {
  loading: PropTypes.bool,
  delay: PropTypes.number,
  icon: PropTypes.oneOf(['youzan', 'circle']),
  iconSize: PropTypes.number,
  iconText: PropTypes.node,
  textPosition: PropTypes.oneOf(['top', 'bottom', 'right', 'left']),
  className: PropTypes.string,
};

const BaseDefaultProps = {
  loading: false,
  icon: 'youzan',
  delay: 0,
  textPosition: 'bottom',
};

export const BlockPropTypes = {
  ...BasePropTypes,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export const BlockDefaultProps = BaseDefaultProps;

export const InlinePropTypes = BasePropTypes;

export const InlineDefaultProps = BaseDefaultProps;

export const FullScreenPropTypes = {
  ...BasePropTypes,
  zIndex: PropTypes.number,
};

export const FullScreenDefaultProps = BaseDefaultProps;
