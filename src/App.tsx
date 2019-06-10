import 'intersection-observer';
import React from 'react';
import Contact from './components/Contact';
import Header from './components/Header';
import Projects from './components/Projects';
import { MenuStore } from './contexts/MenuContext';

const App = () => (
  <MenuStore>
    <div className="app">
      <Header />
      <Projects />
      <Contact />
    </div>
  </MenuStore>
);

export default App;
