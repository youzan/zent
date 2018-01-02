import validationRules from 'form/validationRules';

describe('Validation-Rules', () => {
  // values no use most of the time as arg[0] of validation functions
  const values = {};
  it('required', () => {
    const { required } = validationRules;
    expect(required(values)).toBe(false);
    expect(required(values, '')).toBe(false);
    expect(required(values, ' ')).toBe(true);
  });

  it('isExisty', () => {
    const { isExisty } = validationRules;
    expect(isExisty(values)).toBe(false);
    expect(isExisty(values, null)).toBe(false);
    expect(isExisty(values, '')).toBe(true);
  });

  it('matchRegex', () => {
    const { matchRegex } = validationRules;
    expect(matchRegex(values)).toBe(true);
    expect(matchRegex(values, null)).toBe(true);
    expect(matchRegex(values, '')).toBe(true);
    expect(matchRegex(values, 'bac', /c/)).toBe(true);
    expect(matchRegex(values, 'bac', /^c/)).toBe(false);
    expect(matchRegex(values, 'abc', /^a/)).toBe(true);
  });

  it('isUndefined', () => {
    const { isUndefined } = validationRules;
    expect(isUndefined(values)).toBe(true);
    let t;
    expect(isUndefined(values, t)).toBe(true);
    expect(isUndefined(values, '')).toBe(false);
  });

  it('isEmptyString', () => {
    const { isEmptyString } = validationRules;
    // return value === ''
    expect(isEmptyString(values, '11')).toBe(false);
    expect(isEmptyString(values, 1)).toBe(false);
    expect(isEmptyString(values, '')).toBe(true);
  });

  it('isEmail', () => {
    const { isEmail } = validationRules;

    // NOTE: ！！！空值返回true！！！
    expect(isEmail(values)).toBe(true);
    expect(isEmail(values, null)).toBe(true);
    expect(isEmail(values, '')).toBe(true);

    expect(isEmail(values, 'foo')).toBe(false);
    expect(isEmail(values, 'foo@')).toBe(false);
    expect(isEmail(values, 'foo@.')).toBe(false);
    expect(isEmail(values, 'foo@.com')).toBe(false);
    expect(isEmail(values, 'foo@bar.com')).toBe(true);
    expect(isEmail(values, 'foo1@bar.com')).toBe(true);
    expect(isEmail(values, 'foo1-2@bar.com')).toBe(true);
    expect(isEmail(values, 'foo1-2@bar1.com')).toBe(true);
    expect(isEmail(values, 'foo1-2@bar1-2.com')).toBe(true);
    expect(isEmail(values, 'foo1-2@bar1-2*.com')).toBe(false);
    expect(isEmail(values, 'Foo1-*2@bar1-2.g.com')).toBe(true);
    expect(isEmail(values, 'foo1-*2@Bar1-2.edu.cn')).toBe(true);
  });

  it('isUrl', () => {
    const { isUrl } = validationRules;

    // NOTE: ！！！空值返回true！！！
    expect(isUrl(values)).toBe(true);
    expect(isUrl(values, null)).toBe(true);
    expect(isUrl(values, '')).toBe(true);

    expect(isUrl(values, 'www')).toBe(false);
    expect(isUrl(values, 'www.foo')).toBe(false);
    expect(isUrl(values, 'www.foo.com')).toBe(false);
    expect(isUrl(values, 'http://www')).toBe(false);
    expect(isUrl(values, 'http://foo')).toBe(false);
    expect(isUrl(values, 'http://foo.bar')).toBe(true);
    expect(isUrl(values, 'http://www.foo')).toBe(true);
    expect(isUrl(values, 'https://www.foo')).toBe(true);
    expect(isUrl(values, 'ftp://www.foo')).toBe(true);
    expect(isUrl(values, 'sftp://www.foo')).toBe(true);
    expect(isUrl(values, 'http://foo.com')).toBe(true);
    expect(isUrl(values, 'http://foo.com/foo')).toBe(true);
    expect(isUrl(values, 'http://foo.com/#foo')).toBe(true);
    expect(isUrl(values, 'http://foo.com/#foo/Foo-bar')).toBe(true);
    expect(isUrl(values, 'http://foo.com/foo-bar?foo=bar')).toBe(true);
    expect(isUrl(values, 'http://foo.com/foo-bar?foo=bar')).toBe(true);
    expect(isUrl(values, 'http://foo.com/foo-bar?foo=bar&bar=foo')).toBe(true);
  });

  it('isTrue', () => {
    const { isTrue } = validationRules;

    // return value === true
    expect(isTrue(values)).toBe(false);
    expect(isTrue(values, 1)).toBe(false);
    expect(isTrue(values, true)).toBe(true);
  });

  it('isFalse', () => {
    const { isFalse } = validationRules;

    // return value === false
    expect(isFalse(values)).toBe(false);
    expect(isFalse(values, 0)).toBe(false);
    expect(isFalse(values, false)).toBe(true);
  });

  it('isNumeric', () => {
    const { isNumeric } = validationRules;

    // NOTE: 空值返回true
    expect(isNumeric()).toBe(true);
    expect(isNumeric(values)).toBe(true);
    expect(isNumeric(values, null)).toBe(true);
    expect(isNumeric(values, '')).toBe(true);

    // NOTE: 按type判断和正则判断不匹配
    expect(isNumeric(values, 0)).toBe(true);
    expect(isNumeric(values, -1)).toBe(true);
    expect(isNumeric(values, -1.1)).toBe(true);
    expect(isNumeric(values, -1.1e12)).toBe(true);
    expect(isNumeric(values, 0b101)).toBe(true);
    expect(isNumeric(values, 0o17)).toBe(true);
    expect(isNumeric(values, 0x1a)).toBe(true);

    expect(isNumeric(values, '0')).toBe(true);
    expect(isNumeric(values, '-1')).toBe(true);
    expect(isNumeric(values, '-1.1')).toBe(true);
    expect(isNumeric(values, '-1.1e12')).toBe(false);
    expect(isNumeric(values, '0b101')).toBe(false);
    expect(isNumeric(values, '0o17')).toBe(false);
    expect(isNumeric(values, '0x1a')).toBe(false);
  });

  it('isInt', () => {
    const { isInt } = validationRules;

    // NOTE: 空值返回true
    expect(isInt()).toBe(true);
    expect(isInt(values)).toBe(true);
    expect(isInt(values, null)).toBe(true);
    expect(isInt(values, '')).toBe(true);

    // RegExp.test() support Number input
    expect(isInt(values, 1)).toBe(true);
    expect(isInt(values, 0b1)).toBe(true);
    expect(isInt(values, 0o1)).toBe(true);
    expect(isInt(values, 0x1)).toBe(true);
    expect(isInt(values, '1')).toBe(true);
    expect(isInt(values, 0)).toBe(true);
    expect(isInt(values, '0')).toBe(true);
    expect(isInt(values, '+0')).toBe(true);
    expect(isInt(values, '-0')).toBe(true);
    expect(isInt(values, '+1')).toBe(true);
    expect(isInt(values, '-1')).toBe(true);
    expect(isInt(values, -1234567)).toBe(true);
    expect(isInt(values, '+1234567')).toBe(true);
    expect(isInt(values, 0.1)).toBe(false);
    expect(isInt(values, '0.1')).toBe(false);
  });

  it('isFloat', () => {
    const { isFloat } = validationRules;

    // NOTE: 空值返回true
    expect(isFloat()).toBe(true);
    expect(isFloat(values)).toBe(true);
    expect(isFloat(values, null)).toBe(true);
    expect(isFloat(values, '')).toBe(true);

    expect(isFloat(values, 1.1)).toBe(true);
    expect(isFloat(values, 1)).toBe(true);
    expect(isFloat(values, 0b1)).toBe(true);
    expect(isFloat(values, 0o1)).toBe(true);
    expect(isFloat(values, 0x1)).toBe(true);
    expect(isFloat(values, '1.1')).toBe(true);
    expect(isFloat(values, 0)).toBe(true);
    expect(isFloat(values, '0')).toBe(true);
    expect(isFloat(values, '+0')).toBe(true);
    expect(isFloat(values, '-0')).toBe(true);
    expect(isFloat(values, '+1')).toBe(true);
    expect(isFloat(values, '-1')).toBe(true);
    expect(isFloat(values, -1234.567)).toBe(true);
    expect(isFloat(values, '+1234.567')).toBe(true);
    expect(isFloat(values, 0.1)).toBe(true);
    expect(isFloat(values, '0.1')).toBe(true);
  });

  xit('isWords', () => {
    const { isWords } = validationRules;

    // NOTE: 空值返回true
    expect(isWords()).toBe(true);
    expect(isWords(values)).toBe(true);
    expect(isWords(values, null)).toBe(true);
    expect(isWords(values, '')).toBe(true);

    expect(isWords(values, 'foo bar')).toBe(true);
    expect(isWords(values, 'foo-bar')).toBe(false);
    expect(isWords(values, 'foo_bar')).toBe(false);
    expect(isWords(values, 'foo bar *')).toBe(false);
    expect(isWords(values, 'foo.bar')).toBe(false);
    expect(isWords(values, 'À')).toBe(false);
  });

  xit('isSpecialWords', () => {
    const { isSpecialWords } = validationRules;

    // NOTE: 空值返回true
    expect(isSpecialWords()).toBe(true);
    expect(isSpecialWords(values)).toBe(true);
    expect(isSpecialWords(values, null)).toBe(true);
    expect(isSpecialWords(values, '')).toBe(true);

    expect(isSpecialWords(values, 'foo bar')).toBe(true);
    expect(isSpecialWords(values, 'foo-bar')).toBe(false);
    expect(isSpecialWords(values, 'foo_bar')).toBe(false);
    expect(isSpecialWords(values, 'foo bar *')).toBe(false);
    expect(isSpecialWords(values, 'foo.bar')).toBe(false);
    expect(isSpecialWords(values, 'Àſ')).toBe(true);
  });

  it('isLength', () => {
    const { isLength } = validationRules;

    // NOTE: 空值返回true
    expect(isLength()).toBe(true);
    expect(isLength(values)).toBe(true);
    expect(isLength(values, null)).toBe(true);
    expect(isLength(values, '')).toBe(true);

    expect(isLength(values, 'foo', 3)).toBe(true);
    expect(isLength(values, 'foo', 2)).toBe(false);
    expect(isLength(values, [1, 2, 3], 3)).toBe(true);
    expect(isLength(values, [1, 2, 3], 2)).toBe(false);
    expect(isLength(values, { length: 3 }, 3)).toBe(true);
    expect(isLength(values, { length: 3 }, 2)).toBe(false);
  });

  it('equals', () => {
    const { equals } = validationRules;

    // NOTE: 空值返回true
    expect(equals()).toBe(true);
    expect(equals(values)).toBe(true);
    expect(equals(values, null)).toBe(true);
    expect(equals(values, '')).toBe(true);

    // return value == eql
    expect(equals(values, 12, 12)).toBe(true);
    expect(equals(values, 12, '12')).toBe(true);
    expect(equals(values, 0x12, '18')).toBe(true);
    expect(equals(values, [1, 2], '1,2')).toBe(true);
    expect(
      equals(
        values,
        {
          foo: 'bar',
          valueOf() {
            return 12;
          }
        },
        12
      )
    ).toBe(true);
  });

  it('equalsField', () => {
    const { equalsField } = validationRules;

    // return values[field] == value
    const specialValues = {};
    specialValues.foo = 12;
    specialValues.bar = '1,2';
    // expect(() => {
    //   equalsField();
    // }).toThrow();
    expect(equalsField(specialValues, 12, 'foo')).toBe(true);
    expect(equalsField(specialValues, 12, 'bar')).toBe(false);
    expect(equalsField(specialValues, '12', 'foo')).toBe(true);
    expect(
      equalsField(
        specialValues,
        {
          foo: 'bar',
          valueOf() {
            return 12;
          }
        },
        'foo'
      )
    ).toBe(true);
    expect(equalsField(specialValues, [1, 2], 'bar')).toBe(true);
  });

  it('maxLength', () => {
    const { maxLength } = validationRules;

    // NOTE: 空值(undefined, null)返回true
    expect(maxLength()).toBe(true);
    expect(maxLength(values)).toBe(true);
    expect(maxLength(values, null)).toBe(true);
    expect(maxLength(values, '')).toBe(false);

    // return value.length <= maxLength
    expect(maxLength(values, 'foo', 3)).toBe(true);
    expect(maxLength(values, 'foo', 4)).toBe(true);
    expect(maxLength(values, 'foo', 2)).toBe(false);
    expect(maxLength(values, [1, 2, 3], 2)).toBe(false);
    expect(maxLength(values, [1, 2, 3], 3)).toBe(true);
    expect(maxLength(values, [1, 2, 3], 4)).toBe(true);
    expect(maxLength(values, { length: 3 }, 4)).toBe(true);
    expect(maxLength(values, { length: 3 }, 3)).toBe(true);
    expect(maxLength(values, { length: 3 }, 2)).toBe(false);
  });

  it('minLength', () => {
    const { minLength } = validationRules;

    // NOTE: 空值(undefined, null, '')返回true
    expect(minLength()).toBe(true);
    expect(minLength(values)).toBe(true);
    expect(minLength(values, null)).toBe(true);
    expect(minLength(values, '')).toBe(true);

    // return value.length >= minLength
    expect(minLength(values, 'foo', 3)).toBe(true);
    expect(minLength(values, 'foo', 4)).toBe(false);
    expect(minLength(values, 'foo', 2)).toBe(true);
    expect(minLength(values, [1, 2, 3], 2)).toBe(true);
    expect(minLength(values, [1, 2, 3], 3)).toBe(true);
    expect(minLength(values, [1, 2, 3], 4)).toBe(false);
    expect(minLength(values, { length: 3 }, 4)).toBe(false);
    expect(minLength(values, { length: 3 }, 3)).toBe(true);
    expect(minLength(values, { length: 3 }, 2)).toBe(true);
  });
});
