import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import CreateCountdown from 'pages/CreateCountdown';
import DisplayCountdown from 'pages/DisplayCountdown';
import Home from 'pages/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/create">
          <CreateCountdown />
        </Route>
        <Route path="/display">
          <DisplayCountdown />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
