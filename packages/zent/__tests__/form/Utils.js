import * as Utils from 'form/utils';
import keys from 'lodash/keys';

describe('Form-Utilities', () => {
  const {
    getValue,
    getDisplayName,
    silenceEvent,
    silenceEvents,
    getCurrentValue,
    prefixName
  } = Utils;

  it('getValue', () => {
    const emptyObj = {};
    const objWithValue = { value: 'bar' };
    const target = {};
    const canPassEventTest = {
      preventDefault: () => {},
      stopPropagation: () => {}
    };

    // return arg[0]
    expect(getValue(0, 1)).toBe(0);
    expect(getValue(emptyObj)).toBe(emptyObj);

    // arg[0] && arg[0].value return arg[0].value
    expect(getValue(objWithValue)).toBe('bar');

    // after pass event test, arg[0] must have key 'target'
    expect(() => {
      getValue(canPassEventTest);
    }).toThrow();

    // if(isEvent(arg[0])) return arg[0].target.value
    canPassEventTest.target = target;
    expect(getValue(canPassEventTest)).toBe(undefined);
    target.value = 'foo';
    expect(getValue(canPassEventTest)).toBe('foo');

    // arg[0].target.type === 'checkbox' return arg[0].target.checked
    target.type = 'checkbox';
    expect(getValue(canPassEventTest)).toBe(undefined);
    target.checked = false;
    expect(getValue(canPassEventTest)).toBe(false);

    // type === 'file' return target.files || (arg[0].dataTransfer && arg[0].dataTransfer.files)
    canPassEventTest.dataTransfer = null;
    target.type = 'file';
    expect(getValue(canPassEventTest)).toBe(null);
    const dataT = {};
    canPassEventTest.dataTransfer = dataT;
    expect(getValue(canPassEventTest)).toBe(undefined);
    dataT.files = 'bar';
    expect(getValue(canPassEventTest)).toBe('bar');
    target.files = 'foo-bar';
    expect(getValue(canPassEventTest)).toBe('foo-bar');

    // type === 'select-multiple' return getSelectedValues(arg[0].target.options)
    target.type = 'select-multiple';
    expect(getValue(canPassEventTest).length).toBe(0);
    target.options = [
      { selected: 0, value: 1 },
      { selected: 1, value: 0 },
      { selected: 'foo', value: 'bar' }
    ];
    expect(getValue(canPassEventTest).length).toBe(2);
    expect(getValue(canPassEventTest)[0]).toBe(0);
    expect(getValue(canPassEventTest)[1]).toBe('bar');

    // type === 'number' || 'range', return parseFloat(value)
    target.value = '11a.234';
    target.type = 'number';
    expect(getValue(canPassEventTest)).toBe(11);
    target.value = '-13.23D';
    expect(getValue(canPassEventTest)).toBe(-13.23);
    target.type = 'range';
    expect(getValue(canPassEventTest)).toBe(-13.23);
  });

  it('getDisplayName', () => {
    const compForTest = {};

    // must have arg
    expect(() => {
      getDisplayName();
    }).toThrow();

    // return arg[0].displayName || arg[0].name || 'Component'
    expect(getDisplayName(compForTest)).toBe('Component');
    compForTest.name = 'foo';
    expect(getDisplayName(compForTest)).toBe('foo');
    compForTest.displayName = 'bar';
    expect(getDisplayName(compForTest)).toBe('bar');
  });

  it('silenceEvent', () => {
    const preMock = jest.fn();
    const stopMock = jest.fn();
    const eventObj = {
      preventDefault: preMock,
      stopPropagation: stopMock
    };

    // return isEvent(arg[0])
    expect(silenceEvent()).toBe(false);
    expect(silenceEvent({})).toBe(false);
    expect(preMock.mock.calls.length).toBe(0);
    expect(stopMock.mock.calls.length).toBe(0);
    expect(silenceEvent(eventObj)).toBe(true);
    expect(preMock.mock.calls.length).toBe(1);
    expect(stopMock.mock.calls.length).toBe(0);
  });

  it('silenceEvents', () => {
    const curryMock = jest.fn();
    const preMock = jest.fn();
    const eventObj = {
      preventDefault: preMock,
      stopPropagation: true
    };
    const notEventObj = { bar: 'foo' };

    // must have function as arg[0]
    expect(() => {
      silenceEvents()({});
    }).toThrow();
    silenceEvents(curryMock)(notEventObj, 1);
    expect(curryMock.mock.calls.length).toBe(1);
    expect(preMock.mock.calls.length).toBe(0);
    expect(curryMock.mock.calls[0][0]).toBe(notEventObj);
    expect(curryMock.mock.calls[0][1]).toBe(1);
    silenceEvents(curryMock)(eventObj, 2);
    expect(curryMock.mock.calls.length).toBe(2);
    expect(preMock.mock.calls.length).toBe(1);
    expect(curryMock.mock.calls[1][0]).toBe(2);
  });

  it('getDisplayName', () => {
    const compForTest = {};

    // must have arg
    expect(() => {
      getDisplayName();
    }).toThrow();

    // return arg[0].displayName || arg[0].name || 'Component'
    expect(getDisplayName(compForTest)).toBe('Component');
    compForTest.name = 'foo';
    expect(getDisplayName(compForTest)).toBe('foo');
    compForTest.displayName = 'bar';
    expect(getDisplayName(compForTest)).toBe('bar');
  });

  it('silenceEvent', () => {
    const preMock = jest.fn();
    const stopMock = jest.fn();
    const eventObj = {
      preventDefault: preMock,
      stopPropagation: stopMock
    };

    // return isEvent(arg[0])
    expect(silenceEvent()).toBe(false);
    expect(silenceEvent({})).toBe(false);
    expect(preMock.mock.calls.length).toBe(0);
    expect(stopMock.mock.calls.length).toBe(0);
    expect(silenceEvent(eventObj)).toBe(true);
    expect(preMock.mock.calls.length).toBe(1);
    expect(stopMock.mock.calls.length).toBe(0);
  });

  it('getCurrentValue', () => {
    let changedValue = { name: 'test' };
    let prevValue1 = {};
    let prevValue2 = { address: 'this street' };

    const currentValue1 = getCurrentValue(changedValue, prevValue1);
    expect(keys(currentValue1).length).toBe(1);
    expect(keys(currentValue1)[0]).toBe('name');
    expect(currentValue1.name).toBe('test');

    const currentValue2 = getCurrentValue(changedValue, prevValue2);
    expect(keys(currentValue2).length).toBe(2);
    expect(currentValue2.name).toBe('test');
    expect(currentValue2.address).toBe('this street');

    const currentValue3 = getCurrentValue(changedValue);
    expect(currentValue3).toBe(changedValue);
  });

  it('prefixName', () => {
    const zentForm1 = {};
    const zentForm2 = { prefix: 'boo' };
    const zentForm3 = { prefix: 'boo[1]' };

    expect(prefixName(zentForm1, 'foo')).toBe('foo');
    expect(prefixName(zentForm2, 'foo')).toBe('boo.foo');
    expect(prefixName(zentForm3, 'foo')).toBe('boo[1].foo');
  });
});
