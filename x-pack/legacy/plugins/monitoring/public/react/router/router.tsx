
import React from 'react';
import { Route, Switch, HashRouter, Redirect, Router } from 'react-router-dom';
import { createHashHistory, History, HashHistoryBuildOptions  } from 'history';


//import { MonitoringRoutes } from './routes';

import { useAppStateContext } from '../global_context';

const HASH_CHANGED: string = 'hashchange';

const hashHistoryOptions: HashHistoryBuildOptions = { hashType: 'slash' };
export const history: History<any> = createHashHistory(hashHistoryOptions);

//export goBack();
//export goForward();

import { HomeRoute } from './routes/home_route';
import { NoDataRoute } from './routes/no_data_route';

export const monitoringRoutes: any = [
  HomeRoute,
  NoDataRoute
];

let currentRoute: string;



/*
export const getCurrentRoute = () => { //not used
  //forceRefresh()
  //isCurrentRoute
  //creatHref
  //storageKey
}

*/

export class MonitoringRouter extends React.Component {


  private hashChangedHandler = (e: Event) => {
    e.preventDefault();
    //e.stopImmediatePropagation();
  }

  componentDidMount() {
    console.log('ROUTER > componentDidMount()');
    //window.addEventListener(HASH_CHANGED, this.hashChangedHandler, false);



  }

  componentWillUnmount() {
    //window.removeEventListener(HASH_CHANGED, this.hashChangedHandler, false);
  }

  render() {

    //const { reset } = useGlobalStateContext();



    //console.log(' >>>>>>>>>>>>>>>>> monitoringRoutes:', MonitoringRoutes.routes);

    return (
      <Router history={history}>
        <HashRouter {...hashHistoryOptions}>
          <Switch>
            {monitoringRoutes.map(({ route }: any) => {
              return route;
            })}
            <Redirect to='/' />
          </Switch>
        </HashRouter>
      </Router>
    )
  }
}