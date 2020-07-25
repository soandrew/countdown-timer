import React from 'react';
import { Helmet } from 'react-helmet';
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
    <>
      <Helmet titleTemplate="%s | Countdown Timer" defaultTitle="Countdown Timer">
        <meta property="og:site_name" content="Countdown Timer" />
        <meta property="og:type" content="website" />
      </Helmet>
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
    </>
  );
};

export default App;
