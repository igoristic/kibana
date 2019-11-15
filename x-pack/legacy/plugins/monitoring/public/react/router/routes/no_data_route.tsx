import React from 'react';
import { Route, Switch, HashRouter, Redirect, Router } from 'react-router-dom';

import { history } from '../router';

import { HomeRoute } from './home_route';

///

import { i18n } from '@kbn/i18n';
// @ts-ignore
import { NoData } from '../../../components/no_data';

import { useAppStateContext } from '../../global_context';


//import { MonitoringRoutes } from '../routes';

import { MonitoringViewBase } from './base_route';

const title = i18n.translate('xpack.monitoring.noData.routeTitle', {
  defaultMessage: 'Setup Monitoring'
});

class NoDataView extends MonitoringViewBase {

  //console.log(' >>> RAW: NoDataView');

  /*
  const { setTitle, fetchDataInterval, reset } = useGlobalStateContext();

  React.useEffect(() => {
    console.log(' >>> useEffect: NoDataView');

    reset();
    setTitle(title);
  
    fetchDataInterval({
      api: 'elasticsearch_settings/check/cluster',
      onDataTick: (data: any) => {
        console.log('...NO-DATA > Data:', data);
      }
    });
  }, [setTitle, fetchDataInterval, reset]);
  */

  public componentDidMount() {
    super.componentDidMount();

    this.context.setTitle(title);
    this.context.enableTimeFilter(false);
  }

  private fakeProps = {
    errors: [],
    checkMessage: null,
    isLoading: true,
    isCollectionEnabledUpdating: false,
    isCollectionEnabledUpdated: false,
    isCollectionIntervalUpdating: false,
    isCollectionIntervalUpdated: false
  };


  //TODO: replace with real
  private changePath = (_?: string) => void 0;
  private enableCollectionInterval = () => {
    console.log('enableCollectionInterval');
  }
  private enabler = { enableCollectionInterval: this.enableCollectionInterval };

  public render = () => {
    return (<NoData {...this.fakeProps} enabler={this.enabler} changePath={this.changePath} />)
  }
}

//TODO: create a base class
export class NoDataRoute {

  public static readonly path: string = '/no-data';
  public static readonly route = (<Route exact key={NoDataRoute.path} path={NoDataRoute.path} component={NoDataView} />);

  public static readonly navigate = (state?: any, replace?: boolean) => {
    const historyItem = { pathname: NoDataRoute.path, state };
    (replace) ? history.replace(historyItem) : history.push(historyItem);
  }
}
