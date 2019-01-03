import React from 'react'
import PropTypes from 'prop-types'

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
