import React from 'react';
import { Route, Switch, HashRouter, Redirect, Router } from 'react-router-dom';

import { HomeRoute } from './routes/home_route';
import { NoDataRoute } from './routes/no_data_route';


//<Route exact path='/' component={HomePage} />
//<Route exact path={`/no-data`} component={NoDataPage} />


//'/apm/instances/:uuid'

export const monitoringRoutes = [
  HomeRoute,
  NoDataRoute
];

export const getCurrentRoute = () => {
  //forceRefresh()
  //isCurrentRoute
  //creatHref
  //storageKey
}