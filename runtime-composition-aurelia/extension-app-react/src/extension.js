/* eslint-disable no-console */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

export function load() {
  console.log('load react instance')

  ReactDOM.render(
    <App name="React" />,
    document.getElementById('extension')
  )
  // by convention of this demo, mount it on <div id="extension"></div>
}

export function unload() {
  // small trouble: cannot get document.getElementById('extension').
  // in host-app load-extension detached() callback.
  // This will be fixed in Aurelia vNext detaching() callback.

  // console.log('unload react instance')
  // ReactDOM.unmountComponentAtNode(document.getElementById('extension'))
}
