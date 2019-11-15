
import React from 'react';
import { Route, Switch, HashRouter, Redirect, Router } from 'react-router-dom';
import { createHashHistory, History, HashHistoryBuildOptions } from 'history';

import { useAppStateContext } from '../global_context';

const hashHistoryOptions: HashHistoryBuildOptions = { hashType: 'slash' };
export const history: History<any> = createHashHistory(hashHistoryOptions);

import { HomeRoute } from './routes/home_route';
import { NoDataRoute } from './routes/no_data_route';

export const monitoringRoutes: any = [
  HomeRoute,
  NoDataRoute
];

export class MonitoringRouter extends React.Component {

  render() {
    return (
      <Router history={history}>
        <HashRouter {...hashHistoryOptions}>
          <Switch>
            {monitoringRoutes.map(({ route }: any) => route)}
            <Redirect to='/' />
          </Switch>
        </HashRouter>
      </Router>
    )
  }
}