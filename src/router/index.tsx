import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Show from '../pages/Show';

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/show/:id/:name" component={Show} />
    </Switch>
  );
}
export default Router
