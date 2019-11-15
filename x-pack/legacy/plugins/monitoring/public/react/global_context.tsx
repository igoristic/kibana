
import React from 'react';


export const AppStateContext = React.createContext({} as any); //TODO: create type
export const useAppStateContext = () => {
  const context = React.useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppStateContext must be inside its provider');
  }
  return context;
};



