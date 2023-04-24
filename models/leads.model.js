const mongoose = require('mongoose');
const constants = require("../utils/constants")

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: [constants.leadStatus.new, constants.leadStatus.lost, constants.leadStatus.contacted,constants.leadStatus.canceled, constants.leadStatus.qualified, constants.leadStatus.confirmed],
    default: 'NEW'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
