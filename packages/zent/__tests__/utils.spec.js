import withinRange from '../src/utils/withinRange';

it('withinRange', () => {
  expect(withinRange(3, 10, 20)).toBe(10);
  expect(withinRange(30, 10, 20)).toBe(20);
  expect(withinRange(15, 10, 20)).toBe(15);
});
