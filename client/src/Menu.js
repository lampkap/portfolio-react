import React from 'react';

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const html = document.documentElement;

  return (
    rect.top >= 0 && rect.bottom <= (window.innerHeight || html.clientHeight)
  );
}

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.activeNavItems = this.activeNavItems.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.mobileNavLinksRef = React.createRef();
    this.menuLinkRef = React.createRef();
    this.mobileNavRef = React.createRef();
    this.mobileHeadLinkRef = React.createRef();
    this.mobileProjectsLinkRef = React.createRef();
    this.mobileContactLinkRef = React.createRef();
    this.headLinkRef = React.createRef();
    this.projectsLinkRef = React.createRef();
    this.contactLinkRef = React.createRef();
  }

  componentDidMount() {
    this.activeNavItems();
    window.addEventListener('scroll', this.activeNavItems);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.activeNavItems);
  }

  activeNavItems() {
    const headContent = document.getElementsByClassName('head--content');
    const projects = document.getElementsByClassName('project');
    const contact = document.getElementsByClassName('contact--content');
    const homeLink = this.headLinkRef;
    const projectsLink = this.projectsLinkRef;
    const contactLink = this.contactLinkRef;
    const homeLinkMobile = this.mobileHeadLinkRef;
    const projectsLinkMobile = this.mobileProjectsLinkRef;
    const contactLinkMobile = this.mobileContactLinkRef;

    for (let i = 0; i < projects.length; i++) {
      this.addActiveNavElement(projects[i], projectsLink, projectsLinkMobile);
    }
    this.addActiveNavElement(headContent[0], homeLink, homeLinkMobile);
    this.addActiveNavElement(contact[0], contactLink, contactLinkMobile);
  }

  addActiveNavElement(element, menuItem, mobileMenuItem) {
    const navLink = document.querySelectorAll('.navigation--link a');
    const mNavLink = document.querySelectorAll('.mobile--navigation a');

    
    if (function isInViewport(element)) {
      navLink.forEach(function(link) {
        link.classList.remove('active');
      });

      mNavLink.forEach(function(mLink) {
        mLink.classList.remove('active');
      });

      menuItem.current.classList.add('active');
      mobileMenuItem.current.classList.add('active');
    }
  }

  handleClick() {
    const menuLink = this.menuLinkRef;
    const mobileMenu = this.mobileNavLinksRef;
    const mobileMenuWrapper = this.mobileNavRef;

    mobileMenu.current.classList.remove('hidden');
    mobileMenuWrapper.current.classList.remove('hidden');
    mobileMenu.current.classList.add('animated');
    if (menuLink.current.classList.contains('active')) {
      this.closeMenu(menuLink);
    } else {
      this.openMenu(menuLink);
    }
  }

  closeMenu() {
    const mobileMenu = this.mobileNavLinksRef;
    const menuLink = this.menuLinkRef;
    const mobileMenuWrapper = this.mobileNavRef;

    menuLink.current.classList.remove('active');
    mobileMenu.current.classList.add('animate-out');
    mobileMenu.current.classList.remove('animated');

    setTimeout(function() {
      mobileMenu.current.classList.add('hidden');
      mobileMenu.current.classList.remove('bg-white');
    }, 250);

    setTimeout(function() {
      mobileMenu.current.classList.remove('animate-out');
      mobileMenuWrapper.current.classList.add('hidden');
    }, 500);
  }

  openMenu(element) {
    const mobileMenu = this.mobileNavLinksRef;

    element.current.classList.add('active');
    setTimeout(function() {
      mobileMenu.current.classList.add('bg-white');
    }, 250);
  }

  render() {
    return (
      <div>
        <nav className="navigation">
          <ul className="navigation--links">
            <li className="navigation--link">
              <a
                ref={this.headLinkRef}
                id="head_link"
                href="#head"
                className="active"
              >
                home
              </a>
            </li>
            <li className="navigation--link">
              <a ref={this.projectsLinkRef} id="projects_link" href="#projects">
                projects
              </a>
            </li>
            <li className="navigation--link">
              <a ref={this.contactLinkRef} id="contact_link" href="#contact">
                contact
              </a>
            </li>
          </ul>
        </nav>

        <div ref={this.mobileNavRef} className="mobile--navigation hidden">
          <div
            ref={this.mobileNavLinksRef}
            className="mobile--navigation__links hidden"
          >
            <ul>
              <li>
                <a
                  ref={this.mobileHeadLinkRef}
                  href="#head"
                  onClick={this.closeMenu}
                  className="head_link active"
                >
                  home
                </a>
              </li>
              <li>
                <a
                  ref={this.mobileProjectsLinkRef}
                  href="#projects"
                  onClick={this.closeMenu}
                  className="projects_link"
                >
                  projects
                </a>
              </li>
              <li>
                <a
                  ref={this.mobileContactLinkRef}
                  href="#contact"
                  onClick={this.closeMenu}
                  className="contact_link"
                >
                  contact
                </a>
              </li>
            </ul>
          </div>
          <div className="overlay" />
        </div>
        <button
          ref={this.menuLinkRef}
          type="button"
          id="menu-link"
          onClick={this.handleClick}
        >
          <div id="burger" />
        </button>
      </div>
    );
  }
}

export default Menu;
