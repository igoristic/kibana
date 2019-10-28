
import React from 'react';


export const AppStateContext = React.createContext({} as any);
export const useAppStateContext = () => {
  const context = React.useContext(AppStateContext);
  if (!context) {
    throw new Error('');
  }
  return context;
};



