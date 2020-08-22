export const StoreContext = React.createContext(null);
import React from 'react';

export default ({ children }) => {
    const store = []
    
    return (
      <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
  };