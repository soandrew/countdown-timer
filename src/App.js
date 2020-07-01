import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import CreateCountdown from 'pages/CreateCountdown';
import DisplayCountdown from 'pages/DisplayCountdown';
import Home from 'pages/Home';
import routes from 'static/routes';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={routes.home.path}>
          <Home />
        </Route>
        <Route path={routes.create.path}>
          <CreateCountdown />
        </Route>
        <Route path={routes.display.path}>
          <DisplayCountdown />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
