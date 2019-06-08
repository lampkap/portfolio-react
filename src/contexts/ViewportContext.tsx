import React, { createContext, useState } from 'react';

interface IContextProps {
  inViewport: string[];
  updateViewport: (type:any) => void;
}

export const ViewportContext = createContext({} as IContextProps);

export const ViewportStore = ({ children }: any) => {
  const [inViewport, updateViewport] = useState([]);
  const value = { inViewport, updateViewport };

    return (
      <ViewportContext.Provider value={value}>
        {children}
      </ViewportContext.Provider>
  );
};
