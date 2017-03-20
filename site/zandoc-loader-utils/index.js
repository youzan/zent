exports.map = function map(sections, visitors) {
  return sections.map(function (sec) {
    var firstChild = sec.children[0];
    var type = firstChild.type;
    if (type === 'style') {
      return visitors.style && visitors.style(firstChild);
    } else if (type === 'code') {
      return visitors.demo && visitors.demo(firstChild);
    } else {
      return visitors.markdown && visitors.markdown(sec);
    }
  });
};
