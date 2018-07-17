import React, { Component } from 'react';
import Project from './Project';
import imgBaj from './assets/img/baj.jpg';
import imgImpact from './assets/img/impact.jpg';
import imgCartesio from './assets/img/cartesio.jpg';
import imgAssurbike from './assets/img/assurbike.jpg';
import imgServicerent from './assets/img/servicerent.jpg';
import imgTrias from './assets/img/trias.jpg';

class Projects extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
            height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
        };

        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        const projects = document.querySelectorAll('.project');

        projects.forEach((project) => {
            if(this.isInViewport(project, 'project')) {
                project.classList.add('animated');
            } 
        })
    }

    isInViewport(element, type = "menuitem") {
        const rect = element.getBoundingClientRect();  

        if(this.state.width < 769) {
            if(type === 'project') {
                return rect.top <= 300 && rect.top >= -350; 
            } else {
                return rect.top <= rect.top >= 0;
            }
        } else {
            return rect.top >= 0 && rect.bottom <= window.innerHeight;
        }
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
                        image={imgBaj}
                        name="BAJ BETON"
                        description="A multilingual Drupal 8 website for BAJ Beton with a custom quote calculation module. This tool calculates the price on the fly based on user input. The submissions are exported to an ERP system."
                        link="https://www.baj.be/"
                    />
                    <Project 
                        direction="ltr"
                        image={imgImpact}
                        name="IMPACT"
                        description="A multilingual Drupal 7 website for Impact interim where users can register and log in to apply for a vacancy in one click. Impact uses the restws API to create applications from data sent by a third party."
                        link="https://www.impact.be/"
                    />
                    <Project 
                        direction="rtl"
                        image={imgCartesio}
                        name="CARTESIO"
                        description="A multilingual Drupal 7 website for Cartesio. Cartesio uses a third party software Carerix to create vacancies and to send applications from the website to Carerix."
                        link="https://www.cartesio.be/"
                    />
                    <Project 
                        direction="ltr"
                        image={imgAssurbike}
                        name="ASSURBIKE"
                        description="A Drupal 7 website and a webapplication build with symfony. Assurbike lets you compare different insurance companies based on your entered values."
                        link="https://www.assurbike.be/"
                    />
                    <Project 
                        direction="rtl"
                        image={imgServicerent}
                        name="SERVICERENT"
                        description="A Drupal 7 website for the leasing company Service Rent."
                        link="https://www.servicerent.be/"
                    />
                    <Project 
                        direction="ltr"
                        image={imgTrias}
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
