import './App.css'

import {Switch, Route, Redirect} from 'react-router-dom'

import Home from './components/Home'
import ItemDetailsRoute from './components/ItemDetailsRoute'
import NotFound from './components/NotFound'

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/courses/:id" component={ItemDetailsRoute} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App
