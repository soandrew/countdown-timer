import React from 'react';
import { Route, Switch } from 'react-router-dom';

import useAutoScroll from 'hooks/useAutoScroll';
import CreateCountdown from 'pages/CreateCountdown';
import DisplayCountdown from 'pages/DisplayCountdown';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound'
import routes from 'static/routes';

const App = () => {
  useAutoScroll();
  return (
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
  );
};

export default App;
