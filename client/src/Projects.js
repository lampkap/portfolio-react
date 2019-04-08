import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { getProjectsQuery } from './queries/queries';
import Project from './Project';
import config from './config/config';

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      ),
      height: Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      ),
      currentPixel: window.pageYOffset,
    };

    this.handleScroll = this.handleScroll.bind(this);

    this.looper = this.looper.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    // this.looper();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const projects = document.querySelectorAll('.project');

    projects.forEach(project => {
      if (this.isInViewport(project, 'project')) {
        project.classList.add('animated');
      }
    });
  }

  looper() {
    const sections = document.querySelectorAll('.projects');
    const newPixel = window.pageYOffset;
    const { currentPixel } = this.state;
    const diff = newPixel - currentPixel;
    const speed = diff * 0.05;

    sections.forEach(section => {
      section.style.transform = `skewY(${speed}deg)`;
    });

    this.setState({ currentPixel: newPixel });

    requestAnimationFrame(this.looper);
  }

  isInViewport(element, type = 'menuitem') {
    const rect = element.getBoundingClientRect();
    const { width } = this.state;

    if (width < 769) {
      if (type === 'project') {
        return rect.top <= 300 && rect.top >= -350;
      }
      return rect.top >= 0;
    }
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  }

  render() {
    const { data } = this.props;
    const { projects } = data;

    return (
      <section className="projects" id="projects">
        <div className="content-wrapper">
          <div className="projects--head">
            <h1>My work.</h1>
            <div className="divider" />
          </div>

          {projects ? (
            <div>
              {projects.map((project, i) => {
                const direction = i % 2 === 0 ? 'rtl' : 'ltr';

                return (
                  <Project
                    key={project.id}
                    direction={direction}
                    image={config.ADMIN_URL + project.image}
                    name={project.name.toUpperCase()}
                    description={project.description}
                    link={project.link}
                  />
                );
              })}
            </div>
          ) : (
            <div>Loading projects...</div>
          )}
        </div>
      </section>
    );
  }
}

Projects.propTypes = {
  data: PropTypes.object,
};

export default graphql(getProjectsQuery)(Projects);
