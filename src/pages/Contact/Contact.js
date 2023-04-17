import React from 'react';

function Contact() {
  return (
    <div className='contact-page'>
      <h2>Contact Us</h2>
      <p>Have a question, comment or concern? Fill out the form below and we will get back to you as soon as possible.</p>
      <form>
        <label htmlFor='name'>Name:</label>
        <input type='text' id='name' name='name' required />

        <label htmlFor='email'>Email:</label>
        <input type='email' id='email' name='email' required />

        <label htmlFor='message'>Message:</label>
        <textarea id='message' name='message' required></textarea>

        <button type='submit'>Send</button>
      </form>
    </div>
  );
}

export default Contact;
