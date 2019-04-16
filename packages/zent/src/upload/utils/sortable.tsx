import * as Sortable from 'sortablejs';

const UNSORTABLE = 'unsortable';

export function initSortable(el, onMove) {
  let initState = [];
  const sortable = Sortable.create(el, {
    filter: `.${UNSORTABLE}`,
    onStart() {
      initState = sortable.toArray();
    },
    onMove(evt) {
      return evt.related.className !== UNSORTABLE;
    },
    onEnd(evt) {
      const { newIndex, oldIndex } = evt;
      sortable.sort(initState);
      onMove(oldIndex, newIndex);
    },
  });
  return sortable;
}

export function swapArray(list, fromIndex, toIndex) {
  const result = Array.from([].concat(list));
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  return result;
}
