import React, { Component } from 'react';
import axios from 'axios';

class Contact extends Component {
    
    constructor(props) {
        super(props);
    }

    setLabelPosition(e) {
        if(e.target.value === '') {
            e.target.nextElementSibling.classList.remove('sticky');
        } else {
            e.target.nextElementSibling.classList.add('sticky');
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        let form = e.target;
        let formData = new FormData(form);

        axios.post("/contact", {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
            date: formData.get('date'),
        })
        .then(response => {
            let errors = document.querySelectorAll(".error--message"),
                inputs = document.querySelectorAll(".input--line"),
                success = document.querySelector(".success--message");

            errors.forEach(function(error) {
              error.remove();
            }),
            inputs.forEach(function(input) {
                input.classList.remove("error");
            });
            if(response.data.success === 1) {

                form.classList.add('hidden');

                setTimeout(function() {
                    form.classList.add("removed"), success.classList.remove("removed");
                }, 250);
                
                setTimeout(function() {
                    success.classList.add("shown");
                }, 500);

            } else {

                Object.keys(response.data).forEach(item => {
                    let wrapper = document.querySelector(".input--wrapper." + item),
                        field = document.querySelector("#" + item),
                        err = document.createElement("p");

                    err.classList.add("error--message");
                    err.innerHTML = response.data[item];
                    wrapper.insertBefore(err, wrapper.firstChild);
                    field.classList.add("error");
                });
            }
        });
    }
    
    render() {
        return (
            <section className="contact" id="contact">
                <div className="content-wrapper">
                    <div className="contact--head">
                        <h1>Get in touch.</h1>
                        <div className="divider"></div>
                    </div>
                    <div className="contact--content">

                        <p className="contact--intro">
                            If you have any questions or just want to say hello, you can fill out the form below or mail me at <a href="mailto:info@diemleyssen.be">info@diemleyssen.be</a>.
                        </p>

                        <form method="post" className="contact--form" onSubmit={(e) => this.handleSubmit(e)}>
                            <div className="input--wrapper name">
                                <input onInput={(e) => this.setLabelPosition(e)} className="input--line" name="name" id="name" type="text" />
                                <label htmlFor="name" className="input--label">Name <small>*</small></label>
                            </div>
                            <div className="input--wrapper email">
                                <input onInput={(e) => this.setLabelPosition(e)} className="input--line" name="email" id="email" type="email" />
                                <label htmlFor="email" className="input--label">Email address <small>*</small></label>
                            </div>
                            <div className="input--wrapper message">
                                <textarea onInput={(e) => this.setLabelPosition(e)} name="message" className="input--line" id="message" rows="7"></textarea>
                                <label className="input--label" htmlFor="message">Message <small>*</small></label>
                            </div>
                            <div className="input--wrapper">
                                <input type="text" name="date" id="date" />
                                <label className="input--label" htmlFor="date">Date</label>
                            </div>
                            <div className="input--wrapper">
                                <button type="submit" className="button">Send</button>
                            </div>
                        </form>


                        <div className="success--message removed">
                            <h3>Thanks for your message!</h3>
                            Your message has been successfully sent. I'll get back to you as soon as possible.
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Contact;
