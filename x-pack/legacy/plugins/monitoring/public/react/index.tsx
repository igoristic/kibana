/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';
import { I18nContext } from 'ui/i18n';
import { EuiErrorBoundary } from '@elastic/eui';

import { MonitoringRouter } from './router/router';

import { Header, TimeRange } from './components';

import { AppStateContext } from './global_context';
import { LocationProvider } from './url_provider';

import { fetchAPI } from './api/fetch_api';

type State = {
  title?: string
  enableTimeFilter?: boolean
}

type FetchDataOptions = {
  api: string | null
  bodyOptions?: any
  onDataTick?: (data: any[]) => void
}

const DEFAULT_API_OPTIONS: FetchDataOptions = {
  api: null,
  bodyOptions: {}
};

const ScrollToTop = () => {
  React.useEffect(() => void window.scrollTo(0, 0));
  return null;
};

export class App extends React.Component<{}, State> {

  public state: State = {
    title: 'Stack Monitoring',
    enableTimeFilter: true
  };

  private dataAPIOptions: FetchDataOptions = DEFAULT_API_OPTIONS;

  private setTitle = (title: string) => {
    if (this.state.title !== title) {
      document.title = title;
      this.setState({ title });
    }
  }

  private enableTimeFilter = (enable: boolean) => {
    if (enable !== this.state.enableTimeFilter) {
      this.setState({ enableTimeFilter: enable });
    }
  }

  private fetchDataInterval = (options: FetchDataOptions) => { //should return a promise
    const { api } = options;
    if (!api || !api.trim().length) {
      throw Error(`FetchDataOptions.api in fetchDataInterval method is required`);
    }
    this.dataAPIOptions = options = { ...DEFAULT_API_OPTIONS, ...options };

    this.enableTimeFilter(true);

    /**
     * IF this.dataAPIOptions !== options:

          - ?stop current timer
          
     */
  }

  private fetchData = (options: FetchDataOptions) => { //Will not be exposed
    /**
      - cancel last promise
      - fetch data > then this.dataAPIOptions.onDataTick()
    */

  }

  private onTimerTick = (range: TimeRange) => {
    if (!this.state.enableTimeFilter || !this.dataAPIOptions.api || !this.dataAPIOptions.onDataTick) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //@ts-ignore
        this.dataAPIOptions.onDataTick([Math.random(), Math.random(), Math.random()]);

        resolve();
      }, 3000)
    });



    //- Spread timeFilterSettings into this.dataAPIOptions
    //- fetchData() then fire withIntervalHandler(data) || catch

  }

  private reset = (): void => {
    this.dataAPIOptions = DEFAULT_API_OPTIONS;
  }

  render() {
    return (
      <EuiErrorBoundary>
        <I18nContext>
          <LocationProvider>
            <AppStateContext.Provider value={{
              state: this.state,
              setTitle: this.setTitle,
              fetchDataInterval: this.fetchDataInterval,
              enableTimeFilter: this.enableTimeFilter,
              reset: this.reset
            }} >
              <Header {...{ onTimerTick: this.onTimerTick, title: this.state.title, disableDatePicker: !this.state.enableTimeFilter }} />
              <MonitoringRouter />
            </AppStateContext.Provider>
          </LocationProvider>
        </I18nContext>
      </EuiErrorBoundary>
    );
  }
};