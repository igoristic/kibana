
import React from 'react';
import { Route, Switch, HashRouter, Redirect, Router } from 'react-router-dom';
import { createHashHistory, History, HashHistoryBuildOptions } from 'history';


import { monitoringRoutes } from './routes';

const HASH_CHANGED: string = 'hashchange';

const hashHistoryOptions: HashHistoryBuildOptions = { hashType: 'slash' };
export const history: History<any> = createHashHistory(hashHistoryOptions);

//export goBack();
//export goForward();


export class MonitoringRouter extends React.Component {


  private hashChangedHandler = (e: Event) => {
    //e.preventDefault();
  }

  componentDidMount() {
    //window.addEventListener(HASH_CHANGED, this.hashChangedHandler, false);
  }

  componentWillUnmount() {
    //window.removeEventListener(HASH_CHANGED, this.hashChangedHandler, false);
  }

  render() {
    return (
      <Router history={history}>
        <HashRouter {...hashHistoryOptions}>
          <Switch>
            {monitoringRoutes.map(({ route }) => {

              console.log('...........route:', route);
              return route;
            })}
            <Redirect to='/' />
          </Switch>
        </HashRouter>
      </Router>
    )
  }
}