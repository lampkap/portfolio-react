import axios from 'axios';
import React, { FormEvent, useContext, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import arrow from '../assets/img/right-arrow.svg';
import { MenuContext } from '../contexts/MenuContext';
import { ViewportContext } from '../contexts/ViewportContext';
import { API_URL } from '../data';
import './Contact.scss';

interface IInputState {
  name: string;
  email: string;
  message: string;
  date: string;
}

interface IErrorState {
  name?: string;
  email?: string;
  message?: string;
}

const Contact = () => {
  const [inputs, setInputs] = useState<IInputState>({ name: '', email: '', message: '', date: '' });
  const [errors, setErrors] = useState<IErrorState>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ref, inView] = useInView({ threshold: 0 });
  const { setActive } = useContext(MenuContext);
  const { inViewport, updateViewport } = useContext(ViewportContext);
  const menuItem = 'contact';

  // Set active menu item if  the region is in view port.
  if  (inView && !inViewport.includes(menuItem)) {
    inViewport.push(menuItem);
    updateViewport(inViewport);
  } else if (!inView && inViewport.includes(menuItem)) {
    updateViewport(inViewport.filter((itemInViewport) => itemInViewport !== menuItem));
  }
  
  if (inViewport.includes(menuItem) && inViewport.length === 1) {
    setActive(menuItem);
  }

  const setLabelPosition = (e:any) => {
    const label = e.target.parentNode.querySelector('.input--label');
    if  (e.target.value === '') {
      label.classList.remove('sticky');
    } else {
      label.classList.add('sticky');
    }
  };

  const handleInput = (e:any) => {
    handleErrors();
    setLabelPosition(e);
    const { name, value } = e.currentTarget;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const validEmail = (email:string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleErrors = () => {
    setErrors({});
    const { name, email, message } = inputs;
    // Handle name errors.
    if (name.trim() === '') {
      setErrors((prevErrors) => ({ ...prevErrors, name: 'Your name can not be empty' }));
    }
    // Handle mail errors.
    if (email.trim() === '') {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Your email can not be empty' }));
    } else if (!validEmail(email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Your email is not valid' }));
    }
    // Handle message errors.
    if (message.trim() === '') {
      setErrors((prevErrors) => ({ ...prevErrors, message: 'Your message can not be empty' }));
    }
  };

  const sendRequest = async () => {
    const { name, email, message, date } = inputs;
    setLoading(true);
    const response = await axios.post(`${API_URL}/contact`, { name, email, message, date });
    setLoading(false);
    return response;
  };

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();
    
    // Send request to back-end and send mail.
    const response = await sendRequest();
    
    if (response.data.success === 1) {
      setSuccess(true);
    } else {
      setErrors(response.data);
    }
  };

  return (
    <section ref={ref} className="contact" id="contact">
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
            className={`contact--form ${success ? 'hidden' : 'shown'} ${loading ? 'loading' : ''}`}
            onSubmit={handleSubmit}
          >
            <div className="input--wrapper name">
              {errors.name && errors.name !== '' && (
                <p className="error--message">
                  {errors.name}
                </p>
              )}
              <label htmlFor="name">
                <span className="input--label">
                  Name <small>*</small>
                </span>
                <input
                  onInput={handleInput}
                  className={`input--line ${errors.name && errors.name !== '' ? 'error' : ''}`}
                  name="name"
                  id="name"
                  type="text"
                />
              </label>
            </div>
            <div className="input--wrapper email">
              {errors.email && errors.email !== '' && (
                <p className="error--message">
                  {errors.email}
                </p>
              )}
              <label htmlFor="email">
                <span className="input--label">
                  Email address <small>*</small>
                </span>
                <input
                  onInput={handleInput}
                  className={`input--line ${errors.email && errors.email !== '' ? 'error' : ''}`}
                  name="email"
                  id="email"
                  type="email"
                />
              </label>
            </div>
            <div className="input--wrapper message">
              {errors.message && errors.message !== '' && (
                <p className="error--message">
                  {errors.message}
                </p>
              )}
              <label htmlFor="message">
                <span className="input--label">
                  Message <small>*</small>
                </span>
                <textarea
                  onInput={handleInput}
                  name="message"
                  className={`input--line ${errors.message && errors.message !== '' ? 'error' : ''}`}
                  id="message"
                  rows={7}
                />
              </label>
            </div>
            <div className="input--wrapper">
              <input type="text" name="date" id="date" onInput={handleInput} />
            </div>
            <div className="input--wrapper">
              <button type="submit" className="button">
                <span>Send</span>
                <img src={arrow} className="svg--arrow" alt="Arrow right"/>
              </button>
              
            </div>
          </form>

          <div className={`success--message ${success ? 'shown' : 'removed'}`}>
            <h3>Thanks for your message!</h3>
            Your message has been successfully sent. I'll get back to you as
            soon as possible.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
