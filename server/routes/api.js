const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const Newsletter = require('../models/Newsletter');

// POST /api/contact
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phoneNumber, companyName, jobTitle, country, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const contact = new Contact({ name, email, phoneNumber, companyName, jobTitle, country, message });
    await contact.save();

    res.status(201).json({ success: true, contactId: contact._id });
  } catch (err) {
    console.error('Error saving contact:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/newsletter
router.post('/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const entry = new Newsletter({ email });
    await entry.save();

    res.status(201).json({ success: true, id: entry._id });
  } catch (err) {
    console.error('Error saving newsletter entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;