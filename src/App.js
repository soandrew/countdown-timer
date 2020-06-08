import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import DisplayCountdown from 'components/DisplayCountdown';
import Home from 'components/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
          <ul>
            <li>
              <Link to="display?iso=2020-06-13T00:00:00-04:00">June 13th</Link>
            </li>
            <li>
              <Link to="display?iso=2020-06-30T00:00:00-04:00">June 30th</Link>
            </li>
          </ul>
        </Route>
        <Route path='/display'>
          <DisplayCountdown />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
