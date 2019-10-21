import React from 'react';
import { Route, Switch, HashRouter, Redirect, Router } from 'react-router-dom';

import { history } from '../router';

import { NoDataRoute } from './no_data_route';

//REMOVE
const CODE_PATH_LICENSE = '';
const HomePage: React.FC = (props) => {
  console.log('....HomeRoute() > props:', props);
  console.log('....HomeRoute() > history:', history);
  const title = 'HOME PAGE';
  const toPath = '/';
  return (
    <>
      <h1>{title}</h1> <br />
      <button type="button" onClick={() => {
        NoDataRoute.navigate();
      }}>{toPath}</button>
    </>
  );
};
////



//TODO: create a base class
export class HomeRoute {

  public static readonly path: string = '/';
  public static readonly route = (<Route exact key={HomeRoute.path} path={HomeRoute.path} component={HomePage} />);
  public static readonly codePaths = [CODE_PATH_LICENSE];

  public static readonly navigate = (state?: any, replace?: boolean) => {
    const historyItem = { pathname: HomeRoute.path, state };
    (replace) ? history.replace(historyItem) : history.push(historyItem);

    //historyMethod()

    //history.push()

    //consider fetching cluster routeInit here and adding it to the state?
  }
}