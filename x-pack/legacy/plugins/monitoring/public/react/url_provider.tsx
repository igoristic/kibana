
import React from 'react';

import { history } from './router/router';
import { UnregisterCallback } from 'history';

import { parse, stringify } from 'querystring';

import { shallowObjectCompare, removeNullUndefined } from './lib/utils/objects';
import { timefilterSettings } from './config/defaults';

export type TimefilterParams = {
  refreshInterval?: number
  start?: string
  end?: string
  isPaused?: boolean
}

export type GlobalParams = {
  cluster_uuid?: string
  ccs?: boolean
  inSetupMode?: boolean
}

export const LocationContext = React.createContext({} as any); //TODO create TYPE
export const useLocationContext = () => {
  const context = React.useContext(LocationContext);
  if (!context) {
    throw new Error('');
  }
  return context;
};

type State = {
  timefilterParams?: TimefilterParams
  globalParams?: GlobalParams
}

class TypeCast {
  public static readonly STRING = (val?: string): string => (val || '').toString().trim();
  public static readonly BOOLEAN = (val?: string): boolean => (val === 'true');
  public static readonly NUMBER = (val?: string): number => (Number(val) || 0);
}

export class LocationProvider extends React.Component<{}, State> {

  public state: State = {
    timefilterParams: { ...timefilterSettings },
    globalParams: {},
  };

  private readonly timefilterTypecast = {
    refreshInterval: TypeCast.NUMBER,
    start: TypeCast.STRING,
    end: TypeCast.STRING,
    isPaused: TypeCast.BOOLEAN
  }

  private readonly globalTypecast = {
    cluster_uuid: TypeCast.STRING,
    ccs: TypeCast.BOOLEAN,
    inSetupMode: TypeCast.BOOLEAN
  }

  private removeChangeEvent: UnregisterCallback = () => void 0;
  private lastLocation: string = history.location.pathname;

  componentDidMount() {
    this.removeRisonState();
    this.setStateParams(); 
    this.removeChangeEvent = history.listen(_ => {
      if (history.action !== 'REPLACE' && this.setCurrentLocation(history.location)) {
        this.setStateParams();
      }
    });
  }

  private setCurrentLocation = ({ pathname, search }: { pathname?: string, search?: string }): boolean => {
    const nextLocation: string = `${pathname}${search}`;
    const changed: boolean = nextLocation !== this.lastLocation;
    this.lastLocation = nextLocation;
    return changed;
  }

  componentWillUnmount() {
    this.removeChangeEvent && this.removeChangeEvent();
  }

  private typecastValues = (params: (TimefilterParams | GlobalParams | any), typecastMap: any) => {
    for (const key in params) {
      const param = params[key];
      params[key] = typecastMap[key](param);
    }

    return params;
  }

  private removeRisonState() {
    const currentParams = this.getURLParams();
    delete currentParams._g;
    const { pathname } = history.location;
    const search = stringify(currentParams);
    history.replace({ pathname, search });
  }

  private getURLParams = (): (TimefilterParams & GlobalParams & { _g?: string }) => {
    return parse(decodeURIComponent(history.location.search).substring(1)) || {};
  }

  private setStateParams() {
    const params = this.getURLParams();
    const { refreshInterval, start, end, isPaused, ...globalURLParams } = params;
    const timefilterURLParams = removeNullUndefined({ refreshInterval, start, end, isPaused });
    const timefilterParams = this.typecastValues(timefilterURLParams, this.timefilterTypecast);
    const globalParams = this.typecastValues(globalURLParams, this.globalTypecast);
    const newState: State = {};

    if (!shallowObjectCompare(timefilterParams, this.state.timefilterParams)) {
      newState.timefilterParams = timefilterParams;
    }

    if (!shallowObjectCompare(globalParams, this.state.globalParams)) {
      newState.globalParams = globalParams;
    }

    if (Object.keys(newState).length) {
      this.setState(newState);
    }
  }

  private setURLParams = (params: any, pushState?: boolean) => {
    const newParams = removeNullUndefined({ ...this.getURLParams(), ...params });
    const search: string = `?${stringify(newParams)}`;
    const { pathname } = history.location;
    const historyItem = { pathname, search };
    (pushState) ? history.push(historyItem) : history.replace(historyItem);
  }

  private setTimefilterParams = (timefilterParams: TimefilterParams, pushState?: boolean) => {
    this.setURLParams(timefilterParams, pushState);
  }

  private setGlobalParams = (globalParams: GlobalParams, pushState?: boolean) => {
    this.setURLParams(globalParams, pushState);
  }

  render() {
    return (
      <LocationContext.Provider value={{
        timefilterParams: this.state.timefilterParams,
        globalParams: this.state.globalParams,
        setTimefilterParams: this.setTimefilterParams,
        setGlobalParams: this.setGlobalParams
      }} >
        {this.props.children}
      </LocationContext.Provider>
    );
  }

}