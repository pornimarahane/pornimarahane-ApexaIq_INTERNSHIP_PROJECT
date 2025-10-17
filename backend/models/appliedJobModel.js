const mongoose = require('mongoose');

const AppliedJobSchema = new mongoose.Schema({
  adzunaId: {
    type: String,
    required: true,
  },
  title: { type: String },
  company: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

// ADD THIS LINE BACK - It prevents a user from tracking the same job twice
AppliedJobSchema.index({ userId: 1, adzunaId: 1 }, { unique: true });

module.exports = mongoose.model('AppliedJob', AppliedJobSchema);