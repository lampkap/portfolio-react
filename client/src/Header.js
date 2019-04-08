import React from 'react';
import Menu from './Menu';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverClasses: [],
    };
  }

  _removeFromHoverClasses(val) {
    const { hoverClasses } = this.state;
    const indices = [];
    for (let i = 0; i < hoverClasses.length; i++) {
      if (hoverClasses[i] === val) {
        indices.push(i);
      }
    }

    if (indices.length === 0) return;

    for (const index of indices) {
      hoverClasses.splice(index, 1);
      this.setState({
        hoverClasses,
      });
    }

    // if (index > -1) {
    //   hoverClasses.splice(index, 1);
    // }
  }

  enterBackground() {
    const { hoverClasses } = this.state;
    this._removeFromHoverClasses('left');
    this._removeFromHoverClasses('right');
    hoverClasses.push('center');
    this.setState({
      hoverClasses,
    });
  }

  leaveBackground() {
    const { hoverClasses } = this.state;
    this._removeFromHoverClasses('left');
    this._removeFromHoverClasses('center');
    hoverClasses.push('right');
    this.setState({
      hoverClasses,
    });

    setTimeout(() => {
      this._removeFromHoverClasses('right');
      this._removeFromHoverClasses('center');
      hoverClasses.push('no-transition', 'left');
      this.setState({
        hoverClasses,
      });
    }, 155);

    setTimeout(() => {
      this._removeFromHoverClasses('no-transition');
    }, 205);
  }

  render() {
    const { hoverClasses } = this.state;
    return (
      <header className="head" id="head">
        <div className="content-wrapper">
          <Menu />

          <div className="head--content">
            <h1 className="head--title">Hello.</h1>
            <span className="divider" />
            <p className="head--text">
              My name is Diëm. I’m a full stack webdeveloper
              <br />
              currently working at Novation in Genk, Belgium.
            </p>
            <p className="head--text">
              To find out more about me, check out{' '}
              <a
                className={`info--link ${hoverClasses.join(' ')}`}
                id="resume"
                target="_blank"
                rel="noopener noreferrer"
                href="http://diemleyssen.herokuapp.com/resume.pdf"
                onMouseEnter={e => this.enterBackground(e)}
                onMouseLeave={e => this.leaveBackground(e)}
              >
                my resume
              </a>
              .
            </p>
          </div>
        </div>
        <span className="scroll-indicator" />
      </header>
    );
  }
}

export default Header;
