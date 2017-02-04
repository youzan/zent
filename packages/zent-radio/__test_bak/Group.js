import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Radio from '../src/Radio'
import RadioGroup from '../src/Group'

describe('Controlled Group', () => {
  it('value', () => {
    const radioGroup = TestUtils.renderIntoDocument(
      <RadioGroup value="apple">
        <Radio value="apple">Apple</Radio>
        <Radio value="banana">Banana</Radio>
      </RadioGroup>
    )

    const radios = TestUtils.scryRenderedComponentsWithType(radioGroup, Radio)

    const appleRadioNode = ReactDOM.findDOMNode(radios[0])
    const bananaRadioNode = ReactDOM.findDOMNode(radios[1])

    const appleRadioInputNode = TestUtils.findRenderedDOMComponentWithTag(radios[0], 'input')
    const bananaRadioInputNode = TestUtils.findRenderedDOMComponentWithTag(radios[1], 'input')

    expect(appleRadioNode.className).toContain('zent-radio-checked')
    expect(appleRadioInputNode.checked).toBe(true)

    expect(bananaRadioNode.className).not.toContain('zent-radio-checked')
    expect(bananaRadioInputNode.checked).toBe(false)
  })

  it('onChange', () => {
    let value = 'apple'
    const handleChange = (e) => {
      value = e.target.value
    }
    const radioGroup = TestUtils.renderIntoDocument(
      <RadioGroup value={value} onChange={handleChange}>
        <Radio value="apple">Apple</Radio>
        <Radio value="banana">Banana</Radio>
      </RadioGroup>
    )

    const radios = TestUtils.scryRenderedComponentsWithType(radioGroup, Radio)
    const bananaRadio = radios[1]
    const bananaRadioInputNode = TestUtils.findRenderedDOMComponentWithTag(bananaRadio, 'input')

    TestUtils.Simulate.change(bananaRadioInputNode, { target: { value: 'banana' } })
    expect(value).toBe('banana')
  })

  describe('disabled', () => {
    it('disabled group', () => {
      const radioGroup = TestUtils.renderIntoDocument(
        <RadioGroup value="apple" disabled>
          <Radio value="apple">Apple</Radio>
          <Radio value="banana">Banana</Radio>
        </RadioGroup>
      )

      const radios = TestUtils.scryRenderedComponentsWithType(radioGroup, Radio)

      const appleRadioNode = ReactDOM.findDOMNode(radios[0])
      const bananaRadioNode = ReactDOM.findDOMNode(radios[1])

      const appleRadioInputNode = TestUtils.findRenderedDOMComponentWithTag(radios[0], 'input')
      const bananaRadioInputNode = TestUtils.findRenderedDOMComponentWithTag(radios[1], 'input')

      expect(appleRadioNode.className).toContain('zent-radio-disabled')
      expect(bananaRadioNode.className).toContain('zent-radio-disabled')

      expect(appleRadioInputNode.disabled).toBe(true)
      expect(bananaRadioInputNode.disabled).toBe(true)
    })

    it('radio disabled in group', () => {
      const radioGroup = TestUtils.renderIntoDocument(
        <RadioGroup value="apple">
          <Radio value="apple" disabled>Apple</Radio>
          <Radio value="banana">Banana</Radio>
        </RadioGroup>
      )

      const radios = TestUtils.scryRenderedComponentsWithType(radioGroup, Radio)

      const appleRadioNode = ReactDOM.findDOMNode(radios[0])
      const bananaRadioNode = ReactDOM.findDOMNode(radios[1])

      const appleRadioInputNode = TestUtils.findRenderedDOMComponentWithTag(radios[0], 'input')
      const bananaRadioInputNode = TestUtils.findRenderedDOMComponentWithTag(radios[1], 'input')

      expect(appleRadioNode.className).toContain('zent-radio-disabled')
      expect(bananaRadioNode.className).not.toContain('zent-radio-disabled')

      expect(appleRadioInputNode.disabled).toBe(true)
      expect(bananaRadioInputNode.disabled).toBe(false)
    })

    it('radio not disabled in disabled group', () => {
      const radioGroup = TestUtils.renderIntoDocument(
        <RadioGroup value="apple" disabled>
          <Radio value="apple" disabled={false}>Apple</Radio>
          <Radio value="banana">Banana</Radio>
        </RadioGroup>
      )

      const radios = TestUtils.scryRenderedComponentsWithType(radioGroup, Radio)

      const appleRadioNode = ReactDOM.findDOMNode(radios[0])
      const bananaRadioNode = ReactDOM.findDOMNode(radios[1])

      const appleRadioInputNode = TestUtils.findRenderedDOMComponentWithTag(radios[0], 'input')
      const bananaRadioInputNode = TestUtils.findRenderedDOMComponentWithTag(radios[1], 'input')

      expect(appleRadioNode.className).not.toContain('zent-radio-disabled')
      expect(bananaRadioNode.className).toContain('zent-radio-disabled')

      expect(appleRadioInputNode.disabled).toBe(false)
      expect(bananaRadioInputNode.disabled).toBe(true)
    })
  })

  describe('readOnly', () => {
    it('readOnly group', () => {
      const radioGroup = TestUtils.renderIntoDocument(
        <RadioGroup value="apple" readOnly>
          <Radio value="apple">Apple</Radio>
          <Radio value="banana">Banana</Radio>
        </RadioGroup>
      )

      const radios = TestUtils.scryRenderedComponentsWithType(radioGroup, Radio)

      const appleRadioNode = ReactDOM.findDOMNode(radios[0])
      const bananaRadioNode = ReactDOM.findDOMNode(radios[1])

      const appleRadioInputNode = TestUtils.findRenderedDOMComponentWithTag(radios[0], 'input')
      const bananaRadioInputNode = TestUtils.findRenderedDOMComponentWithTag(radios[1], 'input')

      expect(appleRadioNode.className).toContain('zent-radio-disabled')
      expect(bananaRadioNode.className).toContain('zent-radio-disabled')

      expect(appleRadioInputNode.readOnly).toBe(true)
      expect(bananaRadioInputNode.readOnly).toBe(true)
    })

    it('radio readOnly in group', () => {
      const radioGroup = TestUtils.renderIntoDocument(
        <RadioGroup value="apple">
          <Radio value="apple" readOnly>Apple</Radio>
          <Radio value="banana">Banana</Radio>
        </RadioGroup>
      )

      const radios = TestUtils.scryRenderedComponentsWithType(radioGroup, Radio)

      const appleRadioNode = ReactDOM.findDOMNode(radios[0])
      const bananaRadioNode = ReactDOM.findDOMNode(radios[1])

      const appleRadioInputNode = TestUtils.findRenderedDOMComponentWithTag(radios[0], 'input')
      const bananaRadioInputNode = TestUtils.findRenderedDOMComponentWithTag(radios[1], 'input')

      expect(appleRadioNode.className).toContain('zent-radio-disabled')
      expect(bananaRadioNode.className).not.toContain('zent-radio-disabled')

      expect(appleRadioInputNode.readOnly).toBe(true)
      expect(bananaRadioInputNode.readOnly).toBe(false)
    })

    it('radio not readOnly in readOnly group', () => {
      const radioGroup = TestUtils.renderIntoDocument(
        <RadioGroup value="apple" readOnly>
          <Radio value="apple" readOnly={false}>Apple</Radio>
          <Radio value="banana">Banana</Radio>
        </RadioGroup>
      )

      const radios = TestUtils.scryRenderedComponentsWithType(radioGroup, Radio)

      const appleRadioNode = ReactDOM.findDOMNode(radios[0])
      const bananaRadioNode = ReactDOM.findDOMNode(radios[1])

      const appleRadioInputNode = TestUtils.findRenderedDOMComponentWithTag(radios[0], 'input')
      const bananaRadioInputNode = TestUtils.findRenderedDOMComponentWithTag(radios[1], 'input')

      expect(appleRadioNode.className).not.toContain('zent-radio-disabled')
      expect(bananaRadioNode.className).toContain('zent-radio-disabled')

      expect(appleRadioInputNode.readOnly).toBe(false)
      expect(bananaRadioInputNode.readOnly).toBe(true)
    })
  })

  it('className', () => {
    const radioGroup = TestUtils.renderIntoDocument(
      <RadioGroup className="customClassName" />
    )

    const radioGroupNode = ReactDOM.findDOMNode(radioGroup)
    expect(radioGroupNode.className).toContain('customClassName')
    expect(radioGroupNode.className).toContain('zent-radio-group')
  })

  it('prefix', () => {
    const radioGroup = TestUtils.renderIntoDocument(
      <RadioGroup prefix="custom">
        <Radio value="apple" />
      </RadioGroup>
    )

    const radio = TestUtils.findRenderedComponentWithType(radioGroup, Radio)

    const radioGroupNode = ReactDOM.findDOMNode(radioGroup)
    const radioNode = ReactDOM.findDOMNode(radio)

    // RadioGroup的zent前缀应该被覆盖掉
    expect(radioGroupNode.className).not.toContain('zent-radio-group')
    expect(radioGroupNode.className).toContain('custom-radio-group')

    // Radio的zent前缀应该保留
    expect(radioNode.className).toContain('zent-radio-wrap')
    expect(radioNode.className).not.toContain('custom-radio-wrap')
  })

  it('can customize value compare function', () => {
    const radioGroup = TestUtils.renderIntoDocument(
      <RadioGroup prefix="custom" value={1} isValueEqual={(a, b) => +a === +b}>
        <Radio value="100" />
        <Radio value="1" />
      </RadioGroup>
    );
    const radios = TestUtils.scryRenderedComponentsWithType(radioGroup, Radio);
    const selected = ReactDOM.findDOMNode(radios[1]).querySelector('input');
    expect(selected.checked).toBe(true);
  })
})
