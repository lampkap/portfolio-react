import React, {Component} from 'react';
import Menu from './Menu';

class Header extends Component {

    constructor(props) {
        super(props);
    }

    enterBackground(e) {
        let el = e.target;
        el
            .classList
            .remove('left');
        el
            .classList
            .remove('right');
        el
            .classList
            .add('center');
    }

    leaveBackground(e) {
        let el = e.target;
        el
            .classList
            .remove('left');
        el
            .classList
            .remove('center');
        el
            .classList
            .add('right');

        setTimeout(function () {
            el
                .classList
                .remove("right");
            el
                .classList
                .remove("center");
            el
                .classList
                .add("no-transition");
            el
                .classList
                .add("left");
        }, 155);

        setTimeout(function () {
            el
                .classList
                .remove("no-transition");
        }, 205);
    }

    render() {
        return (
            <header className="head" id="head">
                <div className="content-wrapper">
                    <Menu/>

                    <div className="head--content">
                        <h1 className="head--title">Hello.</h1>
                        <span className="divider"></span>
                        <p className="head--text">
                            My name is Diëm. I’m a webdeveloper with a passion for back-end.
                            <br/>
                            I’m currently working at Novation in Genk, Belgium.
                        </p>
                        <p className="head--text">
                            To find out more about me, check out {" "}
                            <a
                                className="info--link"
                                id="resume"
                                target="_blank"
                                href="/resume.pdf"
                                onMouseEnter={(e) => this.enterBackground(e)}
                                onMouseLeave={(e) => this.leaveBackground(e)}>my resume</a>.
                        </p>
                    </div>
                </div>
                <span className="scroll-indicator"></span>
            </header>
        );
    }
}

export default Header;
