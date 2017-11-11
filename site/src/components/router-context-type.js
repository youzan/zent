import PropTypes from 'prop-types';

export default {
  router: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired
    }).isRequired,
    route: PropTypes.object
  }).isRequired
};
