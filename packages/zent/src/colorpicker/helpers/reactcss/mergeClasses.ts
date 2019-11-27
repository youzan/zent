const mergeClasses = (classes, activeNames = []) => {
  const styles = { ...classes.default };

  activeNames.map(name => {
    const toMerge = classes[name];
    if (toMerge) {
      Object.keys(toMerge).forEach(key => {
        if (!styles[key]) {
          styles[key] = {};
        }

        styles[key] = { ...styles[key], ...toMerge[key] };
      });
    }

    return name;
  });

  return styles;
};

export default mergeClasses;
