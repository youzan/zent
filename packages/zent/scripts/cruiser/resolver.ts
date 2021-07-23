import * as path from 'path';
import * as fs from 'fs';

export interface IResolverOptions {
  mainFiles: string[];
  extensions: string[];
  cwd: string;
  moduleName: string;
}

/**
 * A minimum require.resolve
 *
 * @param {ResolverOption} options
 * @return {string}
 */
export function resolve({
  mainFiles,
  extensions,
  cwd,
  moduleName,
}: IResolverOptions): string {
  const basename = path.resolve(cwd, moduleName);
  mainFiles = ['', ...mainFiles];
  extensions = ['', ...extensions];

  for (let i = 0; i < mainFiles.length; i++) {
    const mainFile = mainFiles[i];

    for (let j = 0; j < extensions.length; j++) {
      const ext = extensions[j];
      const filename = tryFileName(basename, mainFile, ext);

      if (filename) {
        return filename;
      }
    }
  }

  throw new Error(`Module not found: ${moduleName} in ${cwd}`);
}

/**
 * Check if combination points to a real file
 */
function tryFileName(
  basename: string,
  mainFile: string,
  extension: string
): string {
  let filename = basename;

  if (mainFile && extension) {
    filename = path.join(basename, `${mainFile}.${extension}`);
  } else if (mainFile) {
    filename = path.join(basename, mainFile);
  } else if (extension) {
    filename = `${filename}.${extension}`;
  }

  if (fs.existsSync(filename) && fs.statSync(filename).isFile()) {
    return filename;
  }

  return '';
}
