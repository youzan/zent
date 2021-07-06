import Fuse from 'fuse.js';

const options = {
  shouldSort: true,
  threshold: 0.5,
  location: 0,
  distance: 100,
  minMatchCharLength: 1,
  keys: ['title', 'subtitle'],
};

export interface ISearcher<T> {
  search(keyword: string): T[];
}

export default function makeSearcher<T>(list: T[]): ISearcher<T> {
  const fuse = new Fuse(list, options);

  return {
    search(keyword: string) {
      if (!keyword) {
        return list;
      }

      return fuse.search(keyword).map(m => m.item);
    },
  };
}
