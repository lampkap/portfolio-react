import React, { useContext, useEffect, useState } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { MenuContext } from '../contexts/MenuContext';
import './Menu.scss';

const Menu = () => {
  const [mobileMenu, setMobileMenu] = useState('hidden');
  const { active, setActive } = useContext(MenuContext);

  // Set the mobile nav hidden when animation is done.
  useEffect(() => {
    if(mobileMenu === 'animate-out') {
      setTimeout(() => {
        setMobileMenu('hidden');
      }, 500);
    }
  }, [mobileMenu]);

  // Handle burger icon click
  const handleMobileMenu = () => {
    setMobileMenu((prevState:any) => {
      if(prevState === 'open') {
        return 'animate-out';
      } else {
        return 'open';
      }
    });
  };

  // Handle mobile menu link click
  const handleMobileMenuLinkClick = (value:string) => {
    setMobileMenu('animate-out');
    setActive(value);
  };

  return (
    <div>
      <nav className="navigation">
        <ul className="navigation--links">
          <li className="navigation--link">
            <AnchorLink id="head_link" href="#head" onClick={(e:HTMLAnchorElement) => setActive('home')} className={active === 'home' ? 'active' : ''}>
              home
            </AnchorLink>
          </li>
          <li className="navigation--link">
            <AnchorLink offset='-10' id="projects_link" href="#projects" onClick={(e:HTMLAnchorElement) => setActive('projects')} className={active === 'projects' ? 'active' : ''}>
              projects
            </AnchorLink>
          </li>
          <li className="navigation--link">
            <AnchorLink id="contact_link" href="#contact" onClick={(e:HTMLAnchorElement) => setActive('contact')} className={active === 'contact' ? 'active' : ''}>
              contact
            </AnchorLink>
          </li>
        </ul>
      </nav>

      <div className={`mobile--navigation ${mobileMenu}`}>
        <div className={`mobile--navigation__links ${mobileMenu}`}>
          <ul>
            <li>
              <AnchorLink href="#head" onClick={(e:HTMLAnchorElement) => {handleMobileMenuLinkClick('home');}} className={`head_link ${active === 'home' ? 'active' : ''}`}>
                home
              </AnchorLink>
            </li>
            <li>
              <AnchorLink href="#projects" onClick={(e:HTMLAnchorElement) => {handleMobileMenuLinkClick('projects');}} className={`projects_link ${active === 'projects' ? 'active' : ''}`}>
                projects
              </AnchorLink>
            </li>
            <li>
              <AnchorLink href="#contact" onClick={(e:HTMLAnchorElement) => {handleMobileMenuLinkClick('contact');}} className={`contact_link ${active === 'contact' ? 'active' : ''}`}>
                contact
              </AnchorLink>
            </li>
          </ul>
        </div>
        <div className="overlay"/>
      </div>
      <button type="button" id="menu-link" onClick={handleMobileMenu} className={mobileMenu === 'open' ? 'active' : ''}>
        <div id="burger"/>
      </button>
    </div>
  );
};

export default Menu;
