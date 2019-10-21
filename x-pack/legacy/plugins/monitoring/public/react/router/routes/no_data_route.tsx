import React from 'react';
import { Route, Switch, HashRouter, Redirect, Router } from 'react-router-dom';

import { history } from '../router';

import { HomeRoute } from './home_route';

//REMOVE
const CODE_PATH_LICENSE = '';
const NoDataPage: React.FC = (props) => {
  console.log('....NoDataRoute() > props:', props);
  console.log('....NoDataRoute() > history:', history);
  const title = 'NO DATA PAGE';
  const toPath = '/';
  return (
    <>
      <h1>{title}</h1> <br />
      <button type="button" onClick={() => {
        HomeRoute.navigate();
      }}>{toPath}</button>
    </>
  );
};
////



//TODO: create a base class
export class NoDataRoute {

  public static readonly path: string = '/no-data';
  public static readonly route = (<Route exact key={NoDataRoute.path} path={NoDataRoute.path} component={NoDataPage} />);
  public static readonly codePaths = [CODE_PATH_LICENSE];

  public static readonly navigate = (state?: any, replace?: boolean) => {
    const historyItem = { pathname: NoDataRoute.path, state };
    (replace) ? history.replace(historyItem) : history.push(historyItem);

    //historyMethod()

    //history.push()

    //consider fetching cluster routeInit here and adding it to the state?
  }
}