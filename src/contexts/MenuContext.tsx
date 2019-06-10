import React, { createContext, useState } from 'react';

interface IContextProps {
  active: string;
  setActive: (type:any) => void;
  inViewport: string[];
  updateViewport: (type:any) => void;
}

export const MenuContext = createContext({} as IContextProps);

export const MenuStore = ({ children }: any) => {
  const [active, setActive] = useState('');
  const [inViewport, updateViewport] = useState([]);
  const value = { active, setActive, inViewport, updateViewport };

    return (
      <MenuContext.Provider value={value}>
        {children}
      </MenuContext.Provider>
  );
};
