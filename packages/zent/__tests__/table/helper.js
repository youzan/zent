import helper from 'table/helper';

describe('table helpers', () => {
  it('getAlignStyle', () => {
    expect(helper.getAlignStyle('left')).toEqual({
      justifyContent: 'flex-start'
    });

    expect(helper.getAlignStyle('right')).toEqual({
      justifyContent: 'flex-end'
    });

    expect(helper.getAlignStyle('center')).toEqual({
      justifyContent: 'center'
    });

    expect(helper.getAlignStyle('xxx')).toEqual({
      justifyContent: 'flex-start'
    });

    expect(helper.getAlignStyle('')).toEqual({});
  });
});
