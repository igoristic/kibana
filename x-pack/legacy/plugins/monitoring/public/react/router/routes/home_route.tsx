import React from 'react';
import { Route, Switch, HashRouter, Redirect, Router } from 'react-router-dom';

import { history } from '../router';

import { NoDataRoute } from './no_data_route';

import { useAppStateContext } from '../../global_context';

//import { MonitoringRoutes } from '../routes';

import { MonitoringViewBase } from './base_route';


//REMOVE
const CODE_PATH_LICENSE = '';


class HomePage extends MonitoringViewBase {
  //console.log('....HomeRoute() > props:', props);
  //console.log('....HomeRoute() > history:', history);
  private title = 'HOME PAGE';
  private toPath = '/';

  /*
  const { setTitle, reset } = useGlobalStateContext();
  React.useEffect(() => {

    reset();
    setTitle(title)

  }, [setTitle, reset])
  */

  state = {
    data: []
  }

  public componentDidMount() {
    super.componentDidMount();

    this.context.setTitle(this.title);


    this.context.fetchDataInterval({
      api: 'elasticsearch_settings/check/cluster',
      onDataTick: (data: any) => {

        this.setState({ data });

        console.log('...HOME DATA TICK > Data:', data);
      }
    });

    setTimeout(() => {
      this.setLoading(false);
      //this.context.reset();
      console.log('....Stop timer and loading');
    }, 2000);

    //let { setTitle } = this.context.setTitle;
    //setTitle('from base ...');

  }

  public renderView = () => {
    return (
      <>
        <h1> DATA: {this.state.data}</h1> <br />
        <button type="button" onClick={() => {
          NoDataRoute.navigate();
        }}>{this.toPath}</button>
      </>
    );
  }



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
