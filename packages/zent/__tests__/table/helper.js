import helper from 'table/helper';

describe('table helpers', () => {
  it('getAlignClass', () => {
    expect(helper.getAlignClasse('left')).toEqual('start');

    expect(helper.getAlignClasse('right')).toEqual('end');

    expect(helper.getAlignClasse('center')).toEqual('center');

    expect(helper.getAlignClasse('xxx')).toEqual('start');

    expect(helper.getAlignClasse('')).toEqual('');
  });
});
