import React from 'react';
import PropTypes from 'prop-types';

class Project extends React.PureComponent {
  render() {
    const { direction, image, name, description, link } = this.props;
    const articleClasses = `project project--${direction}`;

    return (
      <article className={articleClasses}>
        <div className="project--img__wrapper">
          <figure className="project--image">
            <img src={image} alt="" />
          </figure>
        </div>
        <div className="project--content">
          <h2>{name}</h2>
          <p>{description}</p>
          <div className="project--link">
            <a
              className="project--link__link button"
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit website
            </a>
            <span className="project--link__border" />
          </div>
        </div>
      </article>
    );
  }
}

Project.propTypes = {
  direction: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
};

export default Project;
