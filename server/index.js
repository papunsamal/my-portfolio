const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // Atlas DNS error se bachne ke liye

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const Contact = require('./models/Contact');
const Project = require('./models/Project');

const app = express();
app.use(cors());
app.use(express.json());

// ---------- MongoDB ----------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err.message));

// ---------- Email (Gmail) ----------
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ---------- Routes ----------
app.get('/', (req, res) => res.send('API is running'));

// Contact form: DB mein save + email notification
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Sab fields bharna zaroori hai' });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Email fail ho jaye toh bhi message DB mein save rahega
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: `Portfolio: naya message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      });
    } catch (mailErr) {
      console.log('Email nahi gaya:', mailErr.message);
    }

    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Projects list
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// ---------- Start ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
