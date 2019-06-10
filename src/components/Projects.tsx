import React, { useContext } from 'react';
import { useInView } from 'react-intersection-observer';
import { MenuContext } from '../contexts/MenuContext';
import { projects } from '../data';
import Project from './Project';
import './Projects.scss';

const Projects = () => {
  const [ref, inView] = useInView({ threshold: 0 });
  const { setActive, inViewport, updateViewport } = useContext(MenuContext);
  const menuItem = 'projects';

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
    <section className="projects" id="projects">
      <div className="content-wrapper">
        <div className="projects--head">
          <h1>My work.</h1>
          <div className="divider" />
        </div>

        {projects ? (
          <div ref={ref}>
            {projects.map((project, i) => {
              const direction = i % 2 === 0 ? 'ltr' : 'rtl';

              return (
                <Project
                  key={project.id}
                  direction={direction}
                  image={project.image}
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
};

export default Projects;
