import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import CreateCountdown from 'pages/CreateCountdown';
import DisplayCountdown from 'pages/DisplayCountdown';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound'
import routes from 'static/routes';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={routes.home.path}>
          <Home />
        </Route>
        <Route exact path={routes.create.path}>
          <CreateCountdown />
        </Route>
        <Route exact path={routes.display.path}>
          <DisplayCountdown />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
