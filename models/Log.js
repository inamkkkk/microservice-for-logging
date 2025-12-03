const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true,
    enum: ['error', 'warn', 'info', 'debug', 'trace']
  },
  message: {
    type: String,
    required: true
  },
  service: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
});

module.exports = mongoose.model('Log', logSchema);