import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/Button';
import './ContactForm.css';

export const ContactForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [status, setStatus] = useState(''); // 'sending', 'success', 'error', ''

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    // TODO: Implement one of these options:
    // 
    // OPTION 1: EmailJS
    // import emailjs from '@emailjs/browser';
    // try {
    //   await emailjs.send(
    //     'YOUR_SERVICE_ID',
    //     'YOUR_TEMPLATE_ID',
    //     formData,
    //     'YOUR_PUBLIC_KEY'
    //   );
    //   setStatus('success');
    // } catch (error) {
    //   setStatus('error');
    // }
    //
    // OPTION 2: API Endpoint
    // try {
    //   const response = await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    //   });
    //   if (response.ok) {
    //     setStatus('success');
    //   } else {
    //     setStatus('error');
    //   }
    // } catch (error) {
    //   setStatus('error');
    // }
    //
    // OPTION 3: Telegram Bot
    // const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN';
    // const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID';
    // const message = `
    //   New contact form submission:
    //   Name: ${formData.name}
    //   Email: ${formData.email}
    //   Company: ${formData.company}
    //   Message: ${formData.message}
    // `;
    // try {
    //   await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       chat_id: TELEGRAM_CHAT_ID,
    //       text: message
    //     })
    //   });
    //   setStatus('success');
    // } catch (error) {
    //   setStatus('error');
    // }

    // Temporary mock submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
      
      setTimeout(() => {
        setStatus('');
      }, 3000);
    }, 1000);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">{t.contact.form.name}</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder={t.contact.form.namePlaceholder}
          disabled={status === 'sending'}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">{t.contact.form.email}</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder={t.contact.form.emailPlaceholder}
          disabled={status === 'sending'}
        />
      </div>

      <div className="form-group">
        <label htmlFor="company">{t.contact.form.company}</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder={t.contact.form.companyPlaceholder}
          disabled={status === 'sending'}
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">{t.contact.form.message}</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          placeholder={t.contact.form.messagePlaceholder}
          disabled={status === 'sending'}
        />
      </div>

      <Button 
        type="submit" 
        variant="primary" 
        fullWidth
        disabled={status === 'sending'}
      >
        {status === 'sending' ? t.contact.form.sending : t.contact.form.submit}
      </Button>

      {status === 'success' && (
        <div className="form-message form-message-success">
          {t.contact.form.success}
        </div>
      )}

      {status === 'error' && (
        <div className="form-message form-message-error">
          {t.contact.form.error}
        </div>
      )}
    </form>
  );
};
