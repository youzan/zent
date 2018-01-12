import Fuse from 'fuse.js';

const options = {
  shouldSort: true,
  threshold: 0.5,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ['title', 'subtitle']
};

export default function makeSearcher(list) {
  const fuse = new Fuse(list, options);

  return {
    search(keyword) {
      if (!keyword) {
        return list;
      }

      return fuse.search(keyword);
    }
  };
}
