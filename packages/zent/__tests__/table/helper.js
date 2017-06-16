import helper from 'table/helper';

describe('table helpers', () => {
  it('getAlignClass', () => {
    expect(helper.getAlignStyle('left')).toEqual('start');

    expect(helper.getAlignStyle('right')).toEqual('end');

    expect(helper.getAlignStyle('center')).toEqual('center');

    expect(helper.getAlignStyle('xxx')).toEqual('start');

    expect(helper.getAlignStyle('')).toEqual('');
  });
});
