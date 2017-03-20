/* eslint-disable */

// var fs = require('fs');
// var path = require('path');
// var loaderUtils = require('loader-utils');
var unified = require('unified');
var remarkParser = require('remark-parse');
// var html = require('remark-html');
// var reactRenderer = require('remark-react');
// var React = require('react');
// var ReactDOMServer = require('react-dom/server');
// var compiler = require('markdown-to-jsx').compiler;

// var _ = require('lodash');

var extractDemo = require('./extract-demo');
var consolidateStyles = require('./consolidate-styles');

// var componentTemplate = _.template(fs.readFileSync(path.resolve(__dirname, './template.js')));

// var markdownToHtmlProcessor = remark().use(html);
var markdownParser = unified()
  .use(remarkParser)
  .freeze();

module.exports = function (content) {
  // console.log(loaderUtils.getOptions(this));
  // console.log(content);

  // console.log(
    // ReactDOMServer.renderToStaticMarkup(
      // compiler(content)
      // remark()
      //   .use(reactRenderer, { sanitize: false, createElement: React.createElement })
      //   .processSync(content)
      //   .contents
    // )
  // );

  var ast = markdownParser.parse(content);
  var sections = extractDemo(ast);
  sections = consolidateStyles(sections);

  return sections;

  // fs.writeFileSync('sections.json', JSON.stringify(sections, null, ' '));

  // var mdhtml = markdownToHtmlProcessor.processSync(content);
  // var comp = componentTemplate({
  //   prefix: mdhtml
  // });
  // return comp;
};
