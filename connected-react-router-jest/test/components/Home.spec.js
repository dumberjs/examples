import React from 'react'
import Home from '../../src/components/Home'
import ReactTestUtils from 'react-dom/test-utils'

describe('Home', () => {
  test('Home renders home', () => {
    const comp = ReactTestUtils.renderIntoDocument(
      <Home />,
    )

    const div = ReactTestUtils.findRenderedComponentWithType(comp, 'div')

    // eslint-disable-next-line no-console
    console.log('div', div)
    expect(div.text).toBe('Home')
  })
})
