/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';



type GlobalStateDef = {
  title?: string
  disableTimeRangeSelector?: boolean
  disableAutoRefreshSelector?: boolean
}

const GlobalState = React.createContext({});

export const useGlobalStateContext = () => {
  const context = React.useContext(GlobalState);
  if (!context) {
    throw new Error('useGlobalStateContext() can only be used within <GlobalStateProvider> ... </GlobalStateProvider>');
  }
  return context;
};

export const GlobalStateProvider = (props) => {
  const [state, setState] = React.useState({});
  const value = React.useMemo(() => [state, setState], [JSON.stringify(state)])
  return (
    <GlobalState.Provider value={value}>
      {props.children}
    </GlobalState.Provider>
  );
};
