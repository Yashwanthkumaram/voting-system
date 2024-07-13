const express = require('express');
const router = express.Router();
const Voter = require('../models/voter');

// GET all voters
router.get('/', async (req, res) => {
  try {
    const voters = await Voter.find();
    res.json(voters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new voter
router.post('/', async (req, res) => {
  const voter = new Voter({
    id: req.body.id,
    name: req.body.name,
    email: req.body.email
  });

  try {
    const newVoter = await voter.save();
    res.status(201).json(newVoter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) voter's vote status
router.put('/id/vote', async (req, res) => {
  try {
    const voter = await Voter.findById(req.params.id);
    if (voter.hasVoted) {
      return res.status(400).json({ message: 'Voter has already voted' });
    }

    voter.hasVoted = true;
    await voter.save();
    res.json(voter);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
