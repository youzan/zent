import findLastIndex from 'lodash-es/findLastIndex';
import findIndex from 'lodash-es/findIndex';

import { isWhiteSpace } from './utils';
import { MENTION_NOT_FOUND, MENTION_FOUND } from './constants';

export type FindMentionAtCaretPositionReturn =
  | {
      code: 1;
    }
  | {
      code: 2;

      // where to start measure caret screen position
      caretMeasureStart: number;

      // search keyword is at range: [searchStart, searchEnd]
      searchStart: number;
      searchEnd: number;

      // mention placeholder is at range [placeholderStart, placeholderEnd]
      placeholderStart: number;
      placeholderEnd: number;
    };

const NOT_FOUND: FindMentionAtCaretPositionReturn = {
  code: MENTION_NOT_FOUND,
};

export function findMentionAtCaretPosition({
  input,
  value,
  triggerText,
}): FindMentionAtCaretPositionReturn {
  const { selectionEnd } = input;

  // Find the first space before caret
  const mentionStartIndex = findLastIndex(
    value,
    isWhiteSpace,
    selectionEnd - 1
  );

  // Don't trigger suggestion if caret is right after the space
  if (mentionStartIndex + 1 === selectionEnd) {
    // this.setStateIfChange(this.getDefaultState());
    return NOT_FOUND;
  }

  // Find the next space after caret
  const mentionEndIndex = findIndex(value, isWhiteSpace, selectionEnd);

  // Now try to match triggerText from mentionStartIndex
  let i =
    mentionStartIndex === -1
      ? 0
      : Math.min(mentionStartIndex + 1, value.length - 1);
  const caretMeasureStart = i;

  const end =
    mentionEndIndex === -1
      ? value.length - 1
      : Math.max(mentionEndIndex - 1, 0);
  let j = 0;
  // const { triggerText } = this.props;
  const triggerEnd = triggerText.length - 1;
  let foundTrigger = true;
  while (j <= triggerEnd) {
    if (i > end || value[i] !== triggerText[j]) {
      foundTrigger = false;
      break;
    }

    i++;
    j++;
  }

  if (!foundTrigger) {
    return NOT_FOUND;
  }

  return {
    code: MENTION_FOUND,

    // where to start measure caret screen position
    caretMeasureStart,

    // search keyword is at range: [searchStart, searchEnd]
    searchStart: i,
    searchEnd: end,

    // mention placeholder is at range [placeholderStart, placeholderEnd]
    placeholderStart: caretMeasureStart + triggerText.length,
    placeholderEnd: end,
  };
}
