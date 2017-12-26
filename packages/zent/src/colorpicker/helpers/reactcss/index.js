import flattenNames from './flattenNames';
import mergeClasses from './mergeClasses';
import autoprefix from './autoprefix';

export const ReactCSS = (classes, ...activations) => {
  const activeNames = flattenNames(activations);
  const merged = mergeClasses(classes, activeNames);
  return autoprefix(merged);
};

export default ReactCSS;
