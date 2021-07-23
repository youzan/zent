import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

import Checkbox from '../src/checkbox';

const CheckboxGroup = Checkbox.Group;

describe('Controlled CheckboxGroup', () => {
  it('value', () => {
    const checkboxGroup = TestUtils.renderIntoDocument(
      <CheckboxGroup value={['apple']}>
        <Checkbox value="apple">Apple</Checkbox>
        <Checkbox value="banana">Banana</Checkbox>
      </CheckboxGroup>
    );

    // const radios = TestUtils.scryRenderedComponentsWithType(
    //   radioGroup,
    //   Checkbox
    // );

    // const appleCheckboxNode = ReactDOM.findDOMNode(radios[0]);
    // const bananaCheckboxNode = ReactDOM.findDOMNode(radios[1]);
    const [appleCheckboxNode, bananaCheckboxNode] =
      TestUtils.scryRenderedDOMComponentsWithClass(
        checkboxGroup,
        'zent-checkbox-wrap'
      );
    const [appleCheckboxInputNode, bananaCheckboxInputNode] =
      TestUtils.scryRenderedDOMComponentsWithTag(checkboxGroup, 'input');

    // const appleCheckboxInputNode = TestUtils.findRenderedDOMComponentWithTag(
    //   radios[0],
    //   'input'
    // );
    // const bananaCheckboxInputNode = TestUtils.findRenderedDOMComponentWithTag(
    //   radios[1],
    //   'input'
    // );

    expect(appleCheckboxNode.className).toContain('zent-checkbox-checked');
    expect(appleCheckboxInputNode.checked).toBe(true);

    expect(bananaCheckboxNode.className).not.toContain('zent-checkbox-checked');
    expect(bananaCheckboxInputNode.checked).toBe(false);
  });

  it('onChange', () => {
    let value = ['apple'];
    const handleChange = checkedValue => {
      value = checkedValue;
    };
    const radioGroup = TestUtils.renderIntoDocument(
      <CheckboxGroup value={value} onChange={handleChange}>
        <Checkbox value="apple">Apple</Checkbox>
        <Checkbox value="banana">Banana</Checkbox>
      </CheckboxGroup>
    );

    const [appleCheckboxInputNode, bananaCheckboxInputNode] =
      TestUtils.scryRenderedDOMComponentsWithTag(radioGroup, 'input');

    TestUtils.Simulate.change(bananaCheckboxInputNode, {
      target: { checked: true },
    });
    expect(value).toEqual(['apple', 'banana']);

    TestUtils.Simulate.change(appleCheckboxInputNode, {
      target: { checked: true },
    });
    expect(value).toEqual([]);
  });

  describe('disabled', () => {
    it('disabled group', () => {
      const checkboxGroup = TestUtils.renderIntoDocument(
        <CheckboxGroup value={['apple']} disabled>
          <Checkbox value="apple">Apple</Checkbox>
          <Checkbox value="banana">Banana</Checkbox>
        </CheckboxGroup>
      );

      const [appleCheckboxNode, bananaCheckboxNode] =
        TestUtils.scryRenderedDOMComponentsWithClass(
          checkboxGroup,
          'zent-checkbox-wrap'
        );
      const [appleCheckboxInputNode, bananaCheckboxInputNode] =
        TestUtils.scryRenderedDOMComponentsWithTag(checkboxGroup, 'input');

      expect(appleCheckboxNode.className).toContain('zent-checkbox-disabled');
      expect(bananaCheckboxNode.className).toContain('zent-checkbox-disabled');

      expect(appleCheckboxInputNode.disabled).toBe(true);
      expect(bananaCheckboxInputNode.disabled).toBe(true);
    });

    it('checkbox disabled in group', () => {
      const checkboxGroup = TestUtils.renderIntoDocument(
        <CheckboxGroup value={['apple']}>
          <Checkbox value="apple" disabled>
            Apple
          </Checkbox>
          <Checkbox value="banana">Banana</Checkbox>
        </CheckboxGroup>
      );

      const [appleCheckboxNode, bananaCheckboxNode] =
        TestUtils.scryRenderedDOMComponentsWithClass(
          checkboxGroup,
          'zent-checkbox-wrap'
        );
      const [appleCheckboxInputNode, bananaCheckboxInputNode] =
        TestUtils.scryRenderedDOMComponentsWithTag(checkboxGroup, 'input');

      expect(appleCheckboxNode.className).toContain('zent-checkbox-disabled');
      expect(bananaCheckboxNode.className).not.toContain(
        'zent-checkbox-disabled'
      );

      expect(appleCheckboxInputNode.disabled).toBe(true);
      expect(bananaCheckboxInputNode.disabled).toBe(false);
    });

    it('checkbox disabled in disabled group', () => {
      const checkboxGroup = TestUtils.renderIntoDocument(
        <CheckboxGroup value={['apple']} disabled>
          <Checkbox value="apple" disabled={false}>
            Apple
          </Checkbox>
          <Checkbox value="banana">Banana</Checkbox>
        </CheckboxGroup>
      );

      const [appleCheckboxNode, bananaCheckboxNode] =
        TestUtils.scryRenderedDOMComponentsWithClass(
          checkboxGroup,
          'zent-checkbox-wrap'
        );
      const [appleCheckboxInputNode, bananaCheckboxInputNode] =
        TestUtils.scryRenderedDOMComponentsWithTag(checkboxGroup, 'input');

      expect(
        'zent-checkbox-wrap zent-checkbox-checked zent-checkbox-disabled'
      ).toContain('zent-checkbox-disabled');
      expect(appleCheckboxNode.className).not.toContain(
        'zent-checkbox-disabled'
      );
      expect(bananaCheckboxNode.className).toContain('zent-checkbox-disabled');

      expect(appleCheckboxInputNode.disabled).toBe(false);
      expect(bananaCheckboxInputNode.disabled).toBe(true);
    });
  });

  describe('readOnly', () => {
    it('readOnly group', () => {
      const checkboxGroup = TestUtils.renderIntoDocument(
        <CheckboxGroup value={['apple']} readOnly>
          <Checkbox value="apple">Apple</Checkbox>
          <Checkbox value="banana">Banana</Checkbox>
        </CheckboxGroup>
      );

      const [appleCheckboxNode, bananaCheckboxNode] =
        TestUtils.scryRenderedDOMComponentsWithClass(
          checkboxGroup,
          'zent-checkbox-wrap'
        );
      const [appleCheckboxInputNode, bananaCheckboxInputNode] =
        TestUtils.scryRenderedDOMComponentsWithTag(checkboxGroup, 'input');

      expect(appleCheckboxNode.className).toContain('zent-checkbox-disabled');
      expect(bananaCheckboxNode.className).toContain('zent-checkbox-disabled');

      expect(appleCheckboxInputNode.readOnly).toBe(true);
      expect(bananaCheckboxInputNode.readOnly).toBe(true);
    });

    it('checkbox readOnly in group', () => {
      const checkboxGroup = TestUtils.renderIntoDocument(
        <CheckboxGroup value={['apple']}>
          <Checkbox value="apple" readOnly>
            Apple
          </Checkbox>
          <Checkbox value="banana">Banana</Checkbox>
        </CheckboxGroup>
      );

      const [appleCheckboxNode, bananaCheckboxNode] =
        TestUtils.scryRenderedDOMComponentsWithClass(
          checkboxGroup,
          'zent-checkbox-wrap'
        );
      const [appleCheckboxInputNode, bananaCheckboxInputNode] =
        TestUtils.scryRenderedDOMComponentsWithTag(checkboxGroup, 'input');

      expect(appleCheckboxNode.className).toContain('zent-checkbox-disabled');
      expect(bananaCheckboxNode.className).not.toContain(
        'zent-checkbox-disabled'
      );

      expect(appleCheckboxInputNode.readOnly).toBe(true);
      expect(bananaCheckboxInputNode.readOnly).toBe(false);
    });

    it('checkbox readOnly in readOnly group', () => {
      const checkboxGroup = TestUtils.renderIntoDocument(
        <CheckboxGroup value={['apple']} readOnly>
          <Checkbox value="apple" readOnly={false}>
            Apple
          </Checkbox>
          <Checkbox value="banana">Banana</Checkbox>
        </CheckboxGroup>
      );

      const [appleCheckboxNode, bananaCheckboxNode] =
        TestUtils.scryRenderedDOMComponentsWithClass(
          checkboxGroup,
          'zent-checkbox-wrap'
        );
      const [appleCheckboxInputNode, bananaCheckboxInputNode] =
        TestUtils.scryRenderedDOMComponentsWithTag(checkboxGroup, 'input');

      expect(appleCheckboxNode.className).not.toContain(
        'zent-checkbox-disabled'
      );
      expect(bananaCheckboxNode.className).toContain('zent-checkbox-disabled');

      expect(appleCheckboxInputNode.readOnly).toBe(false);
      expect(bananaCheckboxInputNode.readOnly).toBe(true);
    });
  });

  it('className', () => {
    const radioGroup = TestUtils.renderIntoDocument(
      <CheckboxGroup className="customClassName" />
    );

    const radioGroupNode = ReactDOM.findDOMNode(radioGroup);
    expect(radioGroupNode.className).toContain('customClassName');
    expect(radioGroupNode.className).toContain('zent-checkbox-group');
  });
});
