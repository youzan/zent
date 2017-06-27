import helper from 'table/helper';
import { PureComponent } from 'react';

describe('table helpers', () => {
  it('getAlignClass', () => {
    expect(helper.getAlignClass('left')).toEqual('start');

    expect(helper.getAlignClass('right')).toEqual('end');

    expect(helper.getAlignClass('center')).toEqual('center');

    expect(helper.getAlignClass('xxx')).toEqual('start');

    expect(helper.getAlignClass('')).toEqual('');
  });

  it('getCalculatedWidths', () => {
    expect(helper.getCalculatedWidth(10)).toEqual('10%');
    expect(helper.getCalculatedWidth('10px')).toEqual('10px');
    expect(helper.getCalculatedWidth('10rem')).toEqual('10rem');
  });

  it('isReactComponent', () => {
    const pureFn = () => {};
    class reactFn extends PureComponent {}
    expect(helper.isReactComponent(pureFn)).toEqual(false);
    expect(helper.isReactComponent(reactFn)).toEqual(true);
  });
});
