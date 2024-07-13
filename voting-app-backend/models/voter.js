const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  hasVoted: { type: Boolean, default: false }
});

const Voter = mongoose.model('Voter', voterSchema);

module.exports = Voter;
