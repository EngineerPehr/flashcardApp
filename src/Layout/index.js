import React from "react"
import { Switch, Route, Link} from 'react-router-dom'
import Header from "./Header"
import NotFound from "./NotFound"
import Home from './Home'

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
