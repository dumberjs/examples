/* eslint react/jsx-key: 0 */
import React from 'react'
import Hello from '../../src/components/Hello'
import HelloChild from '../../src/components/HelloChild'
import ShallowRenderer from 'react-test-renderer/shallow'

describe('Hello', () => {
  test('Hello renders Hello and HelloChild', () => {
    const renderer = new ShallowRenderer()
    renderer.render(<Hello />)
    let result = renderer.getRenderOutput()
    expect(result.type).toBe('div')
    expect(result.props.children).toEqual([
      <div>Hello</div>,
      <HelloChild />
    ])
  })
})
