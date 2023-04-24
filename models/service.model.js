const mongoose = require('mongoose');
const constants = require("../utils/constants")

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { 
    type: String,
    enum: [constants.serviceStatus.created, constants.serviceStatus.released, constants.serviceStatus.open, constants.serviceStatus.canceled, constants.serviceStatus.inProcess, constants.serviceStatus.completed],
    default: 'CREATED'
  },
  // other fields
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
