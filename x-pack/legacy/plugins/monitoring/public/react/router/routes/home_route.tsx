import React from 'react';
import { Route, Switch, HashRouter, Redirect, Router } from 'react-router-dom';

import { history } from '../router';

import { NoDataRoute } from './no_data_route';

import { useAppStateContext } from '../../global_context';

import { MonitoringViewBase } from './base_route';


//REMOVE
const CODE_PATH_LICENSE = '';

class HomePage extends MonitoringViewBase {

  private title = 'HOME PAGE';
  private toPath = '/';

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
      }
    });

    //REMOVE: test loading
    setTimeout(() => {
      this.setLoading(false);
    }, 2000);

  }

  public renderView = () => {
    return (
      <>
        <h1> DATA: {this.state.data}</h1> <br />
        <button type="button" onClick={() => {
          NoDataRoute.navigate();
        }}>Go to: {this.toPath}</button>
      </>
    );
  }
};

//TODO: exted from base class
export class HomeRoute {

  public static readonly path: string = '/';
  public static readonly route = (<Route exact key={HomeRoute.path} path={HomeRoute.path} component={HomePage} />);
  public static readonly codePaths = [CODE_PATH_LICENSE];

  public static readonly navigate = (state?: any, replace?: boolean) => { //TODO: move to base class
    const historyItem = { pathname: HomeRoute.path, state };
    //TODO: pass cluster info here (like routeInit) with codePaths into base class
    (replace) ? history.replace(historyItem) : history.push(historyItem);
  }
}
