import uniqueId from 'lodash/uniqueId';
import startsWith from 'lodash/startsWith';
import isEmpty from 'lodash/isEmpty';

import { COMPONENT_GROUP_DESIGN_TYPE } from './design-type';

export function group(name) {
  return {
    type: `${uniqueId(COMPONENT_GROUP_DESIGN_TYPE)}|${name}`,
    name
  };
}

export function isGroupComponent(component) {
  if (!component) {
    return false;
  }

  return startsWith(component.type, COMPONENT_GROUP_DESIGN_TYPE);
}

/**
 * Check if component array is grouped.
 *
 * A grouped component array MUST have a group component as its first element.
 * @param {Array} components
 */
export function isGrouped(components) {
  // Grouped components must have at least 2 elements
  if (!components || components.length < 2) {
    return false;
  }

  const possiblyGroup = components[0];
  return isGroupComponent(possiblyGroup);
}

/**
 * Split component array into an array of groups
 *
 * @param {Array} components
 */
export function splitGroup(components) {
  if (isEmpty(components)) {
    return [];
  }

  const lastIndex = components.length - 1;

  return components.reduce(
    (state, c, idx) => {
      const { groups, buffer, g } = state;
      const isGroup = isGroupComponent(c);

      if (!isGroup) {
        buffer.push(c);
      }

      // When processing the last component, ensure buffer is consumed
      if (isGroup || idx === lastIndex) {
        // Empty group is ignored
        if (g && !isEmpty(buffer)) {
          groups.push({
            g,
            components: buffer
          });
        }

        // Start a new group
        state.buffer = [];
        state.g = c;
      }

      return state;
    },
    { groups: [], buffer: [], g: null }
  ).groups;
}
