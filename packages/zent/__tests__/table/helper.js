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

  it('needFixBatchComps', () => {
    expect(helper.needFixBatchComps(true, false, true, false)).toEqual(true);
    expect(helper.needFixBatchComps(true, false, true, true)).toEqual(null);
    expect(helper.needFixBatchComps(true, true, false, true)).toEqual(false);
    expect(helper.needFixBatchComps(true, true, false, false)).toEqual(null);
    expect(helper.needFixBatchComps(false, false, false, false)).toEqual(null);
  });

  it('toggleEventListener', () => {
    const needFixBatchComps = { batchComponentsAutoFixed: true };
    const noNeedFixBatchComps = { batchComponentsAutoFixed: false };
    expect(
      helper.toggleEventListener(needFixBatchComps, needFixBatchComps)
    ).toEqual(undefined);
    expect(
      helper.toggleEventListener(needFixBatchComps, noNeedFixBatchComps)
    ).toEqual('removeEventListener');
    expect(
      helper.toggleEventListener(noNeedFixBatchComps, needFixBatchComps)
    ).toEqual('addEventListener');
  });
});
