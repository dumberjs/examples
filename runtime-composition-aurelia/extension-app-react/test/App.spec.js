/* eslint react/jsx-key: 0 */
import React from 'react'
import App from '../src/App'
import ShallowRenderer from 'react-test-renderer/shallow'

describe('App', () => {
  test('App renders message', () => {
    const renderer = new ShallowRenderer()
    renderer.render(<App name="React" />)
    let result = renderer.getRenderOutput()
    expect(result.type).toBe('div')
    expect(result.props.children).toEqual([ 'Hello from ', 'React', '!' ])
  })
})
