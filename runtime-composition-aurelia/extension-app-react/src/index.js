import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// Note we load App.css, not App.scss.
// Because in dumber's view, there is no scss file,
// all scss files were transpiled to css files by
// gulp-sass before sending to dumber.
import './App.css'

ReactDOM.render(
  <App name="React" />,
  document.getElementById('react-root')
)
