import forOwn from 'lodash/forOwn';

const transforms = {
  borderRadius: value => {
    return {
      msBorderRadius: value,
      MozBorderRadius: value,
      OBorderRadius: value,
      WebkitBorderRadius: value,
      borderRadius: value,
    };
  },
  boxShadow: value => {
    return {
      msBoxShadow: value,
      MozBoxShadow: value,
      OBoxShadow: value,
      WebkitBoxShadow: value,
      boxShadow: value,
    };
  },
  userSelect: value => {
    return {
      WebkitTouchCallout: value,
      KhtmlUserSelect: value,
      MozUserSelect: value,
      msUserSelect: value,
      WebkitUserSelect: value,
      userSelect: value,
    };
  },

  flex: value => {
    return {
      WebkitBoxFlex: value,
      MozBoxFlex: value,
      WebkitFlex: value,
      msFlex: value,
      flex: value,
    };
  },
  flexBasis: value => {
    return {
      WebkitFlexBasis: value,
      flexBasis: value,
    };
  },
  justifyContent: value => {
    return {
      WebkitJustifyContent: value,
      justifyContent: value,
    };
  },

  transition: value => {
    return {
      msTransition: value,
      MozTransition: value,
      OTransition: value,
      WebkitTransition: value,
      transition: value,
    };
  },

  transform: value => {
    return {
      msTransform: value,
      MozTransform: value,
      OTransform: value,
      WebkitTransform: value,
      transform: value,
    };
  },
  absolute: value => {
    const direction = value && value.split(' ');
    return {
      position: 'absolute',
      top: direction && direction[0],
      right: direction && direction[1],
      bottom: direction && direction[2],
      left: direction && direction[3],
    };
  },
  // extend: (name, otherElementStyles) => {
  //   const otherStyle = otherElementStyles[name];
  //   if (otherStyle) {
  //     return otherStyle;
  //   }
  //   return {
  //     extend: name
  //   };
  // }
};

const autoprefix = elements => {
  const prefixed = {};
  forOwn(elements, (styles, element) => {
    let expanded = {};
    forOwn(styles, (value, key) => {
      const transform = transforms[key];
      if (transform) {
        expanded = { ...expanded, ...transform(value) };
      } else {
        expanded[key] = value;
      }
    });
    prefixed[element] = expanded;
  });
  return prefixed;
};

export default autoprefix;
