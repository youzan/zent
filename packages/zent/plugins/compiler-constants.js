const constants = {
  /**
   * Css arrow horizontal offset, in pixel
   */
  CSS_ARROW_OFFSET_HORIZONTAL: 12,
  /**
   * Css arrow vertical offset, in pixel
   */
  CSS_ARROW_OFFSET_VERTICAL: 6,
  /**
   * Css arrow size, in pixel
   */
  CSS_ARROW_SIZE: 6,
};

if (constants.CSS_ARROW_SIZE % 2 !== 0) {
  throw new Error('error: CSS arrow size must be an even number');
}

module.exports = constants;
