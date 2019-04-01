/**
 * The MIT License (MIT)

  Copyright (c) 2015 Treasure Data

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

  Adapted from https://github.com/bvaughn/highlight-words-core/blob/master/src/utils.js
 */
import { Omit } from 'utility-types';

export type TextMarkSearchWords = string | RegExp;

export interface ITextMarkChunk {
  highlight: boolean;
  start: number;
  end: number;
}

export interface ITextMarkFindAllParameters {
  autoEscape?: boolean;
  caseSensitive?: boolean;
  findChunks: TextMarkFindChunksFunction;
  sanitize?: TextMarkSanitizeFunction;
  searchWords: TextMarkSearchWords[];
  textToHighlight: string;
}

export interface ITextMarkCombineChunksParamters {
  chunks: ITextMarkChunk[];
}

export interface ITextMarkFillInChunksParameters {
  chunksToHighlight: ITextMarkChunk[];
  totalLength: number;
}

export type TextMarkFindChunksFunction = (
  options: Omit<ITextMarkFindAllParameters, 'findChunks'>
) => ITextMarkChunk[];

export type TextMarkSanitizeFunction = (str: string) => string;

/**
 * Creates an array of chunk objects representing both highlightable and
 * non highlightable pieces of text that match each search word.
 */
export function findAll({
  autoEscape,
  caseSensitive = false,
  findChunks = defaultFindChunks,
  sanitize,
  searchWords,
  textToHighlight,
}: ITextMarkFindAllParameters): ITextMarkChunk[] {
  return fillInChunks({
    chunksToHighlight: combineChunks({
      chunks: findChunks({
        autoEscape,
        caseSensitive,
        sanitize,
        searchWords,
        textToHighlight,
      }),
    }),
    totalLength: textToHighlight ? textToHighlight.length : 0,
  });
}

/**
 * Takes an array of chunks and combines chunks that overlap into single chunks.
 */
function combineChunks({
  chunks,
}: ITextMarkCombineChunksParamters): ITextMarkChunk[] {
  chunks = chunks
    .sort((first, second) => first.start - second.start)
    .reduce((processedChunks, nextChunk) => {
      // First chunk just goes straight in the array...
      if (processedChunks.length === 0) {
        return [nextChunk];
      } else {
        // ... subsequent chunks get checked to see if they overlap...
        const prevChunk = processedChunks.pop();
        if (nextChunk.start <= prevChunk.end) {
          // It may be the case that prevChunk completely surrounds nextChunk, so take the
          // largest of the end indices.
          const endIndex = Math.max(prevChunk.end, nextChunk.end);
          processedChunks.push({
            highlight: false,
            start: prevChunk.start,
            end: endIndex,
          });
        } else {
          processedChunks.push(prevChunk, nextChunk);
        }
        return processedChunks;
      }
    }, []);

  return chunks;
}

/**
 * Given a set of chunks to highlight, create an additional set of chunks
 * to represent the bits of text between the highlighted text.
 */
function fillInChunks({
  chunksToHighlight,
  totalLength,
}: ITextMarkFillInChunksParameters): ITextMarkChunk[] {
  const allChunks = [];
  const append = (start, end, highlight) => {
    if (end - start > 0) {
      allChunks.push({
        start,
        end,
        highlight,
      });
    }
  };

  if (chunksToHighlight.length === 0) {
    append(0, totalLength, false);
  } else {
    let lastIndex = 0;
    chunksToHighlight.forEach(chunk => {
      append(lastIndex, chunk.start, false);
      append(chunk.start, chunk.end, true);
      lastIndex = chunk.end;
    });
    append(lastIndex, totalLength, false);
  }
  return allChunks;
}

/**
 * Examine text for any matches.
 * If we find matches, add them to the returned array as a "chunk" object.
 */
const defaultFindChunks: TextMarkFindChunksFunction = function defaultFindChunks({
  autoEscape,
  caseSensitive,
  sanitize = defaultSanitize,
  searchWords,
  textToHighlight,
}) {
  textToHighlight = sanitize(textToHighlight);

  return searchWords
    .filter(searchWord => searchWord) // Remove empty words
    .reduce((chunks, searchWord) => {
      if (typeof searchWord === 'string') {
        searchWord = sanitize(searchWord);

        if (autoEscape) {
          searchWord = escapeRegExpFn(searchWord);
        }
      }

      // TypeScript's definition for RegExp is wrong, the next line is valid according to spec
      const regex = new RegExp(searchWord as any, caseSensitive ? 'g' : 'gi');

      let match: RegExpExecArray;
      while ((match = regex.exec(textToHighlight))) {
        const start = match.index;
        const end = regex.lastIndex;
        // We do not return zero-length matches
        if (end > start) {
          chunks.push({ highlight: false, start, end });
        }

        // Prevent browsers like Firefox from getting stuck in an infinite loop
        // See http://www.regexguru.com/2008/04/watch-out-for-zero-length-matches/
        if (match.index === regex.lastIndex) {
          regex.lastIndex++;
        }
      }

      return chunks;
    }, []);
};

const defaultSanitize: TextMarkSanitizeFunction = function defaultSanitize(
  str
) {
  return str;
};

function escapeRegExpFn(str: string): string {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}
