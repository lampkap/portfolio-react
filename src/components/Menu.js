import React, { Component } from 'react';

class Menu extends Component {
    
    constructor(props) {
        super(props);
        this.activeNavItems = this.activeNavItems.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidMount() {
        this.activeNavItems();
        window.addEventListener('scroll', this.activeNavItems);
    }

    activeNavItems() {

        const headContent = document.getElementsByClassName("head--content"),
              projects = document.getElementsByClassName("project"),
              //contact = document.getElementsByClassName("contact--content"),
              homeLink = document.querySelector("#head_link"),
              projectsLink = document.querySelector("#projects_link"),
              //contactLink = document.querySelector("#contact_link"),
              homeLinkMobile = document.querySelector(".mobile--navigation .head_link"),
              projectsLinkMobile = document.querySelector(".mobile--navigation .projects_link");
              //contactLinkMobile = document.querySelector(".mobile--navigation .contact_link");

        for(let i = 0; i < projects.length; i++) {
            this.addActiveNavElement(projects[i], projectsLink, projectsLinkMobile);
        }
        this.addActiveNavElement(headContent[0], homeLink, homeLinkMobile);
        //this.addActiveNavElement(contact[0], contactLink, contactLinkMobile);
    }

    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        const html = document.documentElement;

        return (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || html.clientHeight)
        );      
    }

    addActiveNavElement(element, menuItem, mobileMenuItem) {

        const navLink = document.querySelectorAll(".navigation--link a"),
              mNavLink = document.querySelectorAll(".mobile--navigation a");

        if(this.isInViewport(element)) {
            navLink.forEach(function(link) {
                link.classList.remove("active");
            });
            
            mNavLink.forEach(function(mLink) {
                mLink.classList.remove("active");
            });
            
            menuItem.classList.add("active");
            mobileMenuItem.classList.add("active");
        }
    }

    handleClick() {
        const menuLink = document.getElementById("menu-link"),
              mobileMenu = document.querySelector(".mobile--navigation__links"),
              mobileMenuWrapper = document.querySelector(".mobile--navigation");

        mobileMenu.classList.remove("hidden"),
        mobileMenuWrapper.classList.remove("hidden"),
        mobileMenu.classList.add("animated"),
        menuLink.classList.contains("active") ? this.closeMenu(menuLink) : this.openMenu(menuLink);
    }

    closeMenu() {
        const mobileMenu = document.querySelector(".mobile--navigation__links"),
              menuLink = document.getElementById("menu-link"),
              mobileMenuWrapper = document.querySelector(".mobile--navigation");

        menuLink.classList.remove("active"),
        mobileMenu.classList.add("animate-out"),
        mobileMenu.classList.remove("animated"),
        setTimeout(function() {
        mobileMenu.classList.add("hidden"),
            mobileMenu.classList.remove("bg-white");
        }, 250),
        setTimeout(function() {
        mobileMenu.classList.remove("animate-out"),
            mobileMenuWrapper.classList.add("hidden");
        }, 500);
    }

    openMenu(element) {
        const mobileMenu = document.querySelector(".mobile--navigation__links");

        element.classList.add("active");
        setTimeout(function() {
            mobileMenu.classList.add("bg-white");
        }, 250);
    }

    render() {
        return (
            <div>
                <nav className="navigation">
                    <ul className="navigation--links">
                        <li className="navigation--link">
                            <a id="head_link" href="#head" className="active">home</a>
                        </li>
                        <li className="navigation--link">
                            <a id="projects_link" href="#projects">projects</a>
                        </li>
                        {/* <li className="navigation--link">
                            <a id="contact_link" href="#contact">contact</a>
                        </li> */}
                    </ul>
                </nav>

                <div className="mobile--navigation hidden">
                    <div className="mobile--navigation__links hidden">
                        <ul>
                            <li><a href="#head" onClick={this.closeMenu} className="head_link active">home</a></li>
                            <li><a href="#projects" onClick={this.closeMenu} className="projects_link">projects</a></li>
                            {/* <li><a href="#contact" onClick={this.closeMenu} className="contact_link">contact</a></li> */}
                        </ul>
                    </div>
                    <div className="overlay"></div>
                </div>
                <a href="javascript:;" id="menu-link" onClick={this.handleClick}><div id="burger"></div></a>
            </div>
        );
    }
}

export default Menu;
