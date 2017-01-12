import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Seed from '../src'


describe('Seed', () => {
  it('work', () => {
    const seed = TestUtils.renderIntoDocument(
      <Seed />
    )

    const seedNode = ReactDOM.findDOMNode(seed)
    expect(seedNode.className).toContain('zent-title')
  })
})
