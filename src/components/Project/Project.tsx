import React from 'react';
import { useInView } from 'react-intersection-observer';
import arrow from '../../assets/img/right-arrow.svg';

interface IProps {
  direction: string;
  image: string;
  name: string;
  description: string;
  link?: string;
}

const Project: React.FC<IProps> = (props) => {
  const { direction, image, name, description, link } = props;
  const [ref, inView] = useInView({
    threshold: .3,
    triggerOnce: true,
  });

  return (
    <article ref={ref} className={`project project--${direction} ${inView ? 'animated' : ''}`}>
      <div className="project--img__wrapper">
        <figure className="project--image">
          <img src={require(`../../assets/img/${image}`)} alt={name} />
        </figure>
      </div>
      <div className="project--content">
        <h2>{name}</h2>
        <p>{description}</p>
        {link && (
          <div className="project--link">
            <a
              className="link"
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="link--text">Visit website</span>
              <div className="link--arrow"/>
            </a>
          </div>
        )}
      </div>
    </article>
  );
};

export default Project;
