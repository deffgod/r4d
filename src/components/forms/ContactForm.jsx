import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/Button';
import { sendToTelegram } from '../../config/telegram';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
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
  const [focusedField, setFocusedField] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // Send to Telegram
      await sendToTelegram(formData);
      
      setStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('');
      }, 5000);
    } catch (error) {
      console.error('Error sending form:', error);
      setStatus('error');
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setStatus('');
      }, 5000);
    }
  };

  return (
    <form className="contact-form-modern" onSubmit={handleSubmit}>
      {/* Name Field */}
      <motion.div 
        className={`form-field ${focusedField === 'name' ? 'focused' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label htmlFor="name" className="form-label">
          {t.contact.form.name}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onFocus={() => setFocusedField('name')}
          onBlur={() => setFocusedField('')}
          required
          placeholder={t.contact.form.namePlaceholder}
          disabled={status === 'sending'}
          className="form-input"
        />
        <div className="form-field-border" />
      </motion.div>

      {/* Email Field */}
      <motion.div 
        className={`form-field ${focusedField === 'email' ? 'focused' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label htmlFor="email" className="form-label">
          {t.contact.form.email}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField('')}
          required
          placeholder={t.contact.form.emailPlaceholder}
          disabled={status === 'sending'}
          className="form-input"
        />
        <div className="form-field-border" />
      </motion.div>

      {/* Company Field */}
      <motion.div 
        className={`form-field ${focusedField === 'company' ? 'focused' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <label htmlFor="company" className="form-label">
          {t.contact.form.company}
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          onFocus={() => setFocusedField('company')}
          onBlur={() => setFocusedField('')}
          placeholder={t.contact.form.companyPlaceholder}
          disabled={status === 'sending'}
          className="form-input"
        />
        <div className="form-field-border" />
      </motion.div>

      {/* Message Field */}
      <motion.div 
        className={`form-field ${focusedField === 'message' ? 'focused' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <label htmlFor="message" className="form-label">
          {t.contact.form.message}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onFocus={() => setFocusedField('message')}
          onBlur={() => setFocusedField('')}
          required
          rows="5"
          placeholder={t.contact.form.messagePlaceholder}
          disabled={status === 'sending'}
          className="form-textarea"
        />
        <div className="form-field-border" />
      </motion.div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button 
          type="submit" 
          variant="primary" 
          fullWidth
          disabled={status === 'sending'}
          className="form-submit-button"
        >
          <span className="button-content">
            {status === 'sending' ? (
              <>
                <motion.div
                  className="button-spinner"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                {t.contact.form.sending}
              </>
            ) : (
              <>
                <Send size={20} />
                {t.contact.form.submit}
              </>
            )}
          </span>
        </Button>
      </motion.div>

      {/* Status Messages */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div 
            className="form-message form-message-success"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <CheckCircle size={20} />
            <span>{t.contact.form.success}</span>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div 
            className="form-message form-message-error"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <AlertCircle size={20} />
            <span>{t.contact.form.error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};
