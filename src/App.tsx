import React from 'react';
import Contact from './components/Contact';
import Header from './components/Header';
import 'intersection-observer';
import Projects from './components/Projects';
import { MenuStore } from './contexts/MenuContext';
import { ViewportStore } from './contexts/ViewportContext';

const App = () => (
  <ViewportStore>
    <MenuStore>
      <div className="app">
        <Header />
        <Projects />
        <Contact />
      </div>
    </MenuStore>
  </ViewportStore>
);

export default App;
