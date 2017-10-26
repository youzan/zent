module.exports = function getJSONMock(path) {
  return new Promise((resolve, reject) => {
    try {
      // eslint-disable-next-line
      resolve(require(`../mock${path}`));
    } catch (err) {
      reject(err);
    }
  });
};
