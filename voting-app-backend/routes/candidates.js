const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate');

// GET all candidates
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new candidate
router.post('/', async (req, res) => {
  const candidate = new Candidate({
    name: req.body.name,
    party: req.body.party,
    icon: req.body.icon
  });

  try {
    const newCandidate = await candidate.save();
    res.status(201).json(newCandidate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
