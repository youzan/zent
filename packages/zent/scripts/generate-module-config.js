#!/usr/bin/env node

const babylon = require('babylon');
const t = require('babel-types');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

function main() {
  const cssConfig = generateCSSConfig();
  const dependencyGraph = generateComponentDependencyGraph();
  const expandedDependencyGraph = Object.keys(
    dependencyGraph
  ).reduce((graph, comp) => {
    graph[comp] = expandDenpendencies(comp, dependencyGraph);
    return graph;
  }, {});
  const cssMapping = generateModuleCSSMapping(
    expandedDependencyGraph,
    cssConfig
  );
  prependBaseCssToMapping(cssMapping);
  const jsMapping = generateModuleJSMapping();
  const mapping = mergeJSAndCSS(jsMapping, cssMapping);
  appendPostcssToMapping(mapping);

  writeJSONToFile(mapping, '../lib/module-mapping.json');
}

main();

function mergeJSAndCSS(js, css) {
  const jsKeys = Object.keys(js);
  const cssKeys = Object.keys(css);
  const jsToCSSKeyMapping = jsKeys.reduce((mapping, jsKey) => {
    const jsModule = js[jsKey];
    const jsModuleParts = jsModule.split('/');
    const cssKey = cssKeys.find(k => jsModuleParts.indexOf(k) !== -1);

    mapping[jsKey] = cssKey;
    return mapping;
  }, {});

  return jsKeys.reduce((config, component) => {
    config[component] = {
      js: js[component],
      css: css[jsToCSSKeyMapping[component]]
    };
    return config;
  }, {});
}

function generateModuleJSMapping() {
  const zentIndex = readFileFromZent('src/index.js');
  const ast = babylon.parse(zentIndex, {
    sourceType: 'module',
    plugins: ['objectRestSpread', 'classProperties', 'exportExtensions']
  });

  return ast.program.body
    .filter(statement => t.isImportDeclaration(statement))
    .reduce((config, imp) => {
      const componentName = imp.specifiers[0].local.name;
      const dirName = `zent/lib/${imp.source.value}`;

      if (componentName && dirName) {
        config[componentName] = dirName;
      }
      return config;
    }, {});
}

function generateModuleCSSMapping(graph, cssConfig) {
  return Object.keys(graph).reduce((mapping, comp) => {
    mapping[comp] = graph[comp]
      .filter(d => cssConfig[d])
      .map(d => cssConfig[d]);

    return mapping;
  }, {});
}

function generateCSSConfig() {
  const styleDir = path.join(__dirname, '../assets');

  return fs
    .readdirSync(styleDir)
    .filter(
      f =>
        fs.statSync(path.join(styleDir, f)).isFile() &&
        f !== 'index.js' &&
        !f.startsWith('.')
    )
    .reduce((mapping, f) => {
      const comp = path.basename(f, '.pcss');
      mapping[comp] = `zent/css/${comp}.css`;
      return mapping;
    }, {});
}

function findComponentDependencies(component, components) {
  const cwd = path.join(__dirname, '../src', component);
  const globPattern = `**/*.js`;

  return uniq(
    flatten(
      glob
        .sync(globPattern, {
          cwd
        })
        .map(filename => {
          const filepath = path.join(cwd, filename);
          const source = fs.readFileSync(filepath, { encoding: 'utf-8' });
          const ast = babylon.parse(source, {
            sourceType: 'module',
            plugins: [
              'jsx',
              'doExpressions',
              'objectRestSpread',
              'decorators',
              'classProperties',
              'exportExtensions',
              'asyncGenerators',
              'functionBind',
              'functionSent',
              'dynamicImport'
            ]
          });

          return ast.program.body
            .filter(st => t.isImportDeclaration(st))
            .map(st => st.source.value)
            .filter(src => isZentImport(src, components))
            .map(normalizeZentImport);
        })
    )
  );
}

function generateComponentDependencyGraph() {
  const componentDir = path.join(__dirname, '../src');
  const components = fs
    .readdirSync(componentDir)
    .filter(p => fs.statSync(path.join(componentDir, p)).isDirectory());

  return components.reduce((dependencyMap, comp) => {
    const dependencies = findComponentDependencies(comp, components);
    dependencyMap[comp] = dependencies;
    return dependencyMap;
  }, {});
}

function expandDenpendencies(mod, graph) {
  const queue = [mod].concat(graph[mod]);
  const dependencies = [];

  while (queue.length) {
    const d = queue.shift();
    dependencies.unshift(d);
    const nextLevelDependency = graph[d];
    queue.splice(queue.length, 0, ...nextLevelDependency);
  }

  return uniq(dependencies);
}

function appendPostcssToMapping(mapping) {
  Object.keys(mapping).forEach(componentName => {
    const config = mapping[componentName];
    const { css } = config;

    config.postcss = css.map(cssPath =>
      cssPath.replace(/\/css\/(.+)\.css$/, '/assets/$1.pcss')
    );
  });

  return mapping;
}

function prependBaseCssToMapping(cssMapping) {
  Object.keys(cssMapping).forEach(compName => {
    cssMapping[compName].unshift('zent/css/base.css');
  });
  return cssMapping;
}

// Utilities
function readFileFromZent(file) {
  const fullpath = path.join(__dirname, '../', file);
  return fs.readFileSync(fullpath, { encoding: 'utf-8' });
}

function writeJSONToFile(json, filename) {
  const fullpath = path.join(__dirname, filename);
  fs.writeFileSync(fullpath, JSON.stringify(json, null, '  '));
}

function isZentImport(importSource, components) {
  return components.some(c => {
    return c === importSource || importSource.startsWith(`${c}/`);
  });
}

function normalizeZentImport(imp) {
  if (imp.indexOf('/') !== -1) {
    return imp.split('/')[0];
  }

  return imp;
}

function flatten(arr) {
  return [].concat.apply([], arr); // eslint-disable-line
}

function uniq(arr) {
  return Array.from(new Set(arr));
}
