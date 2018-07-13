import React, { Component } from 'react';
import Header from './Header';
import Projects from './Projects';
import Contact from './Contact';

class App extends Component {   
    
    componentDidMount() {
        const linksToAnchors = document.querySelectorAll('a[href^="#"]');
        linksToAnchors.forEach(each => (each.onclick = this.anchorLinkHandler));
    }

    anchorLinkHandler(e) {
        e.preventDefault();
        const targetID = this.href.slice(this.href.indexOf("#"));
        const element = document.querySelector(targetID);
        const originalTop = element.getBoundingClientRect().top;
        const originalLeft = element.getBoundingClientRect().left;
    
        window.scrollBy({
            top: originalTop,
            left: originalLeft,
            behavior: "smooth"
        });
    
        const checkIfDone = setInterval(function() {
            const currentTop = element.getBoundingClientRect().top,
                  currentLeft = element.getBoundingClientRect().left;
            if (Math.floor(currentTop) === 0 && Math.floor(currentLeft) === 0) {
                element.tabIndex = "-1";
                element.focus();
                clearInterval(checkIfDone);
            }
        }, 100);
    }

    render() {
        return (
            <div>
                <Header />
                <Projects />
                <Contact />
            </div>
        );
    }
}

export default App;
