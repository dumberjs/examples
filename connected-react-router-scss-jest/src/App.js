import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'
import routes from './routes'
// Note we load App.css, not App.scss.
// Because in dumber's view, there is no scss file,
// all scss files were transpiled to css files by
// gulp-sass before sending to dumber.
import './App.css'

const App = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      { routes }
    </ConnectedRouter>
  )
}

App.propTypes = {
  history: PropTypes.object,
}

export default App
