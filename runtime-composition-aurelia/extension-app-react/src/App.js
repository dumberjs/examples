import React from 'react'
import PropTypes from 'prop-types'
// Note we load App.css, not App.scss.
// Because in dumber's view, there is no scss file,
// all scss files were transpiled to css files by
// gulp-sass before sending to dumber.
import './App.css'

class App extends React.Component {
  render() {
    return (
      <div className="react-app">
        Hello from {this.props.name}!
      </div>
    )
  }

  static get propTypes() {
    return {
      name: PropTypes.string
    }
  }
}

export default App
