import helper from 'table/helper';

describe('table helpers', () => {
  it('getAlignClass', () => {
    expect(helper.getAlignClass('left')).toEqual('start');

    expect(helper.getAlignClass('right')).toEqual('end');

    expect(helper.getAlignClass('center')).toEqual('center');

    expect(helper.getAlignClass('xxx')).toEqual('start');

    expect(helper.getAlignClass('')).toEqual('');
  });
});
