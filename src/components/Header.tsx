import React, { useContext } from 'react';
import { useInView } from 'react-intersection-observer';
import { MenuContext } from '../contexts/MenuContext';
import './Header.scss';
import Menu from './Menu';


const Header = () => {
  const [ref, inView] = useInView({ threshold: 0 });
  const { setActive, inViewport, updateViewport } = useContext(MenuContext);
  const menuItem = 'home';

  // Set active menu item if the region is in view port.
  if (inView && !inViewport.includes(menuItem)) {
    inViewport.push(menuItem);
    updateViewport(inViewport);
  } else if (!inView && inViewport.includes(menuItem)) {
    updateViewport(inViewport.filter((itemInViewport) => itemInViewport !== menuItem));
  }
  
  if(inViewport.includes(menuItem) && inViewport.length === 1) {
    setActive(menuItem);
  }

  return (
    <header ref={ref} className="head" id="head">
      <div className="content-wrapper">
        <Menu />
        <div className="head--content">
          <h1 className="head--title">Hello.</h1>
          <span className="divider" />
          <p className="head--text">
            My name is Diëm. I’m a full stack webdeveloper
            <br />
            currently working at Novation in Genk, Belgium.
          </p>
          <p className="head--text">
            To find out more about me, check out{' '}
            <a
              className="info--link"
              id="resume"
              target="_blank"
              rel="noopener noreferrer"
              href="http://diemleyssen.herokuapp.com/resume.pdf"
            >
              my resume
            </a>
            .
          </p>
        </div>
      </div>
      <span className="scroll-indicator" />
    </header>
  );
};

export default Header;
