/* eslint-disable no-console */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// Note we load App.css, not App.scss.
// Because in dumber's view, there is no scss file,
// all scss files were transpiled to css files by
// gulp-sass before sending to dumber.
import './App.css'

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
