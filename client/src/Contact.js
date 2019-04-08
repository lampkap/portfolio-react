import React, { Component } from 'react';
import axios from 'axios';

function setLabelPosition(e) {
  const label = e.target.parentNode.querySelector('.input--label');
  if (e.target.value === '') {
    label.classList.remove('sticky');
  } else {
    label.classList.add('sticky');
  }
}

function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  axios
    .post('/contact', {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      date: formData.get('date'),
    })
    .then(response => {
      const errors = document.querySelectorAll('.error--message');
      const inputs = document.querySelectorAll('.input--line');
      const success = document.querySelector('.success--message');

      errors.forEach(function(error) {
        error.remove();
      });

      inputs.forEach(function(input) {
        input.classList.remove('error');
      });

      if (response.data.success === 1) {
        form.classList.add('hidden');

        setTimeout(function() {
          form.classList.add('removed');
          success.classList.remove('removed');
        }, 250);

        setTimeout(function() {
          success.classList.add('shown');
        }, 500);
      } else {
        Object.keys(response.data).forEach(item => {
          const wrapper = document.querySelector(`.input--wrapper.${item}`);
          const field = document.querySelector(`#${item}`);
          const err = document.createElement('p');

          err.classList.add('error--message');
          err.innerHTML = response.data[item];
          wrapper.insertBefore(err, wrapper.firstChild);
          field.classList.add('error');
        });
      }
    });
}

class Contact extends Component {
  render() {
    return (
      <section className="contact" id="contact">
        <div className="content-wrapper">
          <div className="contact--head">
            <h1>Get in touch.</h1>
            <div className="divider" />
          </div>
          <div className="contact--content">
            <p className="contact--intro">
              If you have any questions or just want to say hello, you can fill
              out the form below or mail me at{' '}
              <a href="mailto:diemleyssen@gmail.com">diemleyssen@gmail.com</a>.
            </p>

            <form
              method="post"
              className="contact--form"
              onSubmit={e => handleSubmit(e)}
            >
              <div className="input--wrapper name">
                <label htmlFor="name">
                  <span className="input--label">
                    Name <small>*</small>
                  </span>
                  <input
                    onInput={e => setLabelPosition(e)}
                    className="input--line"
                    name="name"
                    id="name"
                    type="text"
                  />
                </label>
              </div>
              <div className="input--wrapper email">
                <label htmlFor="email">
                  <span className="input--label">
                    Email address <small>*</small>
                  </span>
                  <input
                    onInput={e => setLabelPosition(e)}
                    className="input--line"
                    name="email"
                    id="email"
                    type="email"
                  />
                </label>
              </div>
              <div className="input--wrapper message">
                <label htmlFor="message">
                  <span className="input--label">
                    Message <small>*</small>
                  </span>
                  <textarea
                    onInput={e => setLabelPosition(e)}
                    name="message"
                    className="input--line"
                    id="message"
                    rows="7"
                  />
                </label>
              </div>
              <div className="input--wrapper">
                <input type="text" name="date" id="date" />
              </div>
              <div className="input--wrapper">
                <button type="submit" className="button">
                  Send
                </button>
              </div>
            </form>

            <div className="success--message removed">
              <h3>Thanks for your message!</h3>
              Your message has been successfully sent. I'll get back to you as
              soon as possible.
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Contact;
