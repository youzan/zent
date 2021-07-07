import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

import Switch from '../src/switch';

describe('<Switch />', () => {
  let testSwitch;
  let switchNode;

  function mount(Component) {
    testSwitch = TestUtils.renderIntoDocument(Component);
    switchNode = ReactDOM.findDOMNode(testSwitch);
  }

  it('switch checked loading', () => {
    mount(<Switch checked loading />);
    expect(switchNode.className).toContain('zent-switch-loading');
    expect(switchNode.className).toContain('zent-switch-checked');
  });

  it('switch disable', () => {
    mount(<Switch disabled />);
    expect(switchNode.className).toContain('zent-switch-disabled');
  });

  it('switch size', () => {
    mount(<Switch size="small" />);
    expect(switchNode.className).toContain('zent-switch-small');
  });

  it('switch onChange', () => {
    let isChecked = false;
    mount(
      <Switch
        onChange={() => {
          isChecked = true;
        }}
      />
    );
    TestUtils.Simulate.click(switchNode);
    expect(isChecked).toBe(true);
  });
});
