import React from 'react'
import Home from '../../src/components/Home'
import ShallowRenderer from 'react-test-renderer/shallow'

describe('Home', () => {
  test('Home renders home', () => {
    const renderer = new ShallowRenderer()
    renderer.render(<Home />)
    let result = renderer.getRenderOutput()
    expect(result.type).toBe('div')
    expect(result.props.children).toBe('Home')
  })
})
