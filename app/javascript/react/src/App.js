import React from 'react';
// import ReactDOM from 'react-dom';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import NavBar from './components/NavBar'
import IndexPage from './containers/IndexPage'
import ImageEditorContainerUpload from './containers/ImageEditorContainerUpload'
import ImageEditorContainerEdit from './containers/ImageEditorContainerEdit'
import ExportShowPage from './containers/ExportShowPage'

const App = props => {
  return(
    <Router history={browserHistory}>
      <Route path='/' component={NavBar}>
        <IndexRoute component={IndexPage}/>
        <Route path='/users/:user_id/uploads/:id' component={ImageEditorContainerUpload}/>
        <Route path='/edits/:id' component={ImageEditorContainerEdit}/>
        <Route path='/users/:user_id/uploads/:upload_id/exports/:id' component={ExportShowPage}/>
      </Route>
    </Router>
  )
}


export default App
