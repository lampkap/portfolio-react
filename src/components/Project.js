import React, { Component } from 'react';

class Project extends Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {

        const articleClasses = "project project--" + this.props.direction;

        return (
            <article className={articleClasses}>
                <div className="project--img__wrapper">
                    <figure className="project--image">
                        <img src={this.props.image} alt="" />
                    </figure>
                </div>
                <div className="project--content">
                    <h2>{this.props.name}</h2>
                    <p>
                        {this.props.description}
                    </p>
                    <div className="project--link">
                        <a className="project--link__link button" href={this.props.link} target="_blank">Visit website</a>
                        <span className="project--link__border"></span>
                    </div>
                </div>
            </article>
        );
    }
}

export default Project;
