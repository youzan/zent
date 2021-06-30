// Auto generated by `scripts/generate-unicode-regexp.js`.
// DO NOT EDIT
const CJK_REGEXP =
  /\xB7|\xD7|\u2014|\u2018|\u2019|\u201C|\u201D|\u2026|[\u2E80-\u2EFF]|[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\u31C0-\u31EF]|[\u3200-\u32FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FFF]|[\u3400-\u4DBF]|(?:[\uD840-\uD868][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF])|(?:\uD869[\uDF00-\uDFFF]|[\uD86A-\uD86C][\uDC00-\uDFFF]|\uD86D[\uDC00-\uDF3F])|(?:\uD86D[\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1F])|(?:\uD86E[\uDC20-\uDFFF]|[\uD86F-\uD872][\uDC00-\uDFFF]|\uD873[\uDC00-\uDEAF])|(?:\uD873[\uDEB0-\uDFFF]|[\uD874-\uD879][\uDC00-\uDFFF]|\uD87A[\uDC00-\uDFEF])|(?:[\uD880-\uD883][\uDC00-\uDFFF]|\uD884[\uDC00-\uDF4F])|[\uF900-\uFAFF]|[\u3300-\u33FF]|[\uFE30-\uFE4F]|[\uF900-\uFAFF]|(?:\uD87E[\uDC00-\uDE1F])/;

export function containsCJK(str: string): boolean {
  return CJK_REGEXP.test(str);
}
