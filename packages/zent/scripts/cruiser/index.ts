import * as path from 'path';
import * as fs from 'fs';
import { getModuleMapping } from './mapping';
import { getExportedNames } from './analyzer';
import { stringify } from './json';

/**
 * Usage: ts-node --project cruiser/tsconfig.json cruiser/index.ts src/index.ts assets
 */
function main() {
  const rootModule = path.resolve(process.argv[2]);
  const styleRootDir = path.resolve(process.argv[3]);

  const exportedNames = getExportedNames(rootModule);
  const mapping = getModuleMapping(exportedNames, styleRootDir);

  fs.writeFileSync(
    path.resolve(__dirname, '../../dependency-graph.json'),
    stringify(mapping),
    { encoding: 'utf-8' }
  );
}

main();
