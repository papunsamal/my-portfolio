import { useState } from "react";
import axios from "axios";
import SocialLinks from "./SocialLinks";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus("Sending...");

    try {
      await axios.post(`${API}/api/contact`, form);
      setStatus("Message sent successfully! ✅");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("Something went wrong. Try again ❌");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="contact-orb" aria-hidden="true">
        <span className="orb-ring"></span>
        <div className="orb-cube">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </div>
      </div>

      <p className="section-tag">// GET IN TOUCH</p>
      <h2 className="section-title">
        Let's work <span className="highlight">together</span>
      </h2>

      <p className="muted">Or connect me here:</p>
      <SocialLinks />
      <br />

      <form className="contact-form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="contact-name">
          Your Name
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <label className="sr-only" htmlFor="contact-email">
          Your Email
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <label className="sr-only" htmlFor="contact-message">
          Your Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows="5"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit" className="btn-primary" disabled={sending}>
          {sending ? "Sending..." : "Send Message"}
        </button>

        <p
          className={`form-status ${status.includes("successfully") ? "is-success" : ""} ${status.includes("wrong") ? "is-error" : ""}`}
          role="status"
          aria-live="polite"
        >
          {status}
        </p>
      </form>
    </section>
  );
}

export default Contact;
