/* eslint-disable prefer-arrow-callback */
const postcss = require('postcss');
const { KEYFRAME_NAME_PREFIX } = require('./constants');

module.exports = postcss.plugin('postcss-plugin-lint', () => {
  return root => {
    root.walkAtRules(atRule => {
      const { name, params } = atRule;
      if (name === 'keyframes' && !params.startsWith(KEYFRAME_NAME_PREFIX)) {
        throw atRule.error(
          `keyframes name must start with '${KEYFRAME_NAME_PREFIX}'`,
          {
            word: params,
          }
        );
      }
    });
  };
});
