import React from 'react';
// import ReactDOM from 'react-dom';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import NavBar from './components/NavBar'
import IndexPage from './containers/IndexPage'
import ImageEditorContainer from './containers/ImageEditorContainer'
import ExportShowPage from './containers/ExportShowPage'

const App = props => {
  return(
    <Router history={browserHistory}>
      <Route path='/' component={NavBar}>
        <IndexRoute component={IndexPage}/>
        <Route path='/users/:user_id/uploads/:id' component={ImageEditorContainer}/>
        <Route path='/users/:user_id/uploads/:upload_id/exports/:id' component={ExportShowPage}/>
      </Route>
    </Router>
  )
}


export default App
