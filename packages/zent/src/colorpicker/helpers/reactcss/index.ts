import flattenNames from './flattenNames';
import mergeClasses from './mergeClasses';
import autoprefix from './autoprefix';

export const ReactCSS = <T extends {}>(classes: T, ...activations: any[]) => {
  const activeNames = flattenNames(activations);
  const merged = mergeClasses(classes, activeNames);
  return autoprefix(merged);
};

export default ReactCSS;
