import { useState } from 'react';
import axios from 'axios';
import SocialLinks from './SocialLinks';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSending(true);
    setStatus('Sending...');

    try {
      await axios.post(`${API}/api/contact`, form);
      setStatus('Message sent successfully! ✅');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('Something went wrong. Try again ❌');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section">
      <p className="section-tag">// GET IN TOUCH</p>
      <h2 className="section-title">
        Let's work <span className="highlight">together</span>
      </h2>

      <p className="muted">Ya mujhe yahan connect karo:</p>
      <SocialLinks />
      <br />

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          rows="5"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit" className="btn-primary" disabled={sending}>
          {sending ? 'Sending...' : 'Send Message'}
        </button>

        {status && <p className="form-status">{status}</p>}
      </form>
    </section>
  );
}

export default Contact;
