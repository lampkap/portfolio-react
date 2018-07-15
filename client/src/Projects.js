import React, { Component } from 'react';
import Project from './Project';

class Projects extends Component {
    
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        const projects = document.querySelectorAll('.project');

        projects.forEach((project) => {
            if(this.isInViewport(project)) {
                project.classList.add('animated');
            } 
        })
    }

    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        const html = document.documentElement;
        return (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || html.clientHeight)
        );      
    }
    
    render() {
        return (
                
            <section className="projects" id="projects">
                <div className="content-wrapper">
                    <div className="projects--head">
                        <h1>My work.</h1>
                        <div className="divider"></div>
                    </div>

                    <Project 
                        direction="rtl"
                        image="img/baj.jpg"
                        name="BAJ BETON"
                        description="A multilingual Drupal 8 website for BAJ Beton with a custom quote calculation module. This tool calculates the price on the fly based on user input. The submissions are exported to an ERP system."
                        link="https://www.baj.be/"
                    />
                    <Project 
                        direction="ltr"
                        image="img/impact.jpg"
                        name="IMPACT"
                        description="A multilingual Drupal 7 website for Impact interim where users can register and log in to apply for a vacancy in one click. Impact uses the restws API to create applications from data sent by a third party."
                        link="https://www.impact.be/"
                    />
                    <Project 
                        direction="rtl"
                        image="img/cartesio.jpg"
                        name="CARTESIO"
                        description="A multilingual Drupal 7 website for Cartesio. Cartesio uses a third party software Carerix to create vacancies and to send applications from the website to Carerix."
                        link="https://www.cartesio.be/"
                    />
                    <Project 
                        direction="ltr"
                        image="img/assurbike.jpg"
                        name="ASSURBIKE"
                        description="A Drupal 7 website and a webapplication build with symfony. Assurbike lets you compare different insurance companies based on your entered values."
                        link="https://www.assurbike.be/"
                    />
                    <Project 
                        direction="rtl"
                        image="img/servicerent.jpg"
                        name="SERVICERENT"
                        description="A Drupal 7 website for the leasing company Service Rent."
                        link="https://www.servicerent.be/"
                    />
                    <Project 
                        direction="ltr"
                        image="img/trias.jpg"
                        name="TRIAS"
                        description="A Drupal 7 multisite for the NGO Trias."
                        link="https://www.trias.ngo/"
                    />
                </div>
            </section>
        );
    }
}

export default Projects;
