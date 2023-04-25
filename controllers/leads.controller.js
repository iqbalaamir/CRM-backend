const Lead = require('../models/leads.model');

exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.status(200).json(leads);
  } catch (err) {
    console.log('Error in getting leads:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createLead = async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    const savedLead = await newLead.save();
    res.status(201).json(savedLead);
  } catch (err) {
    console.log('Error in creating lead:', err.message);
    res.status(500).json({ message: err.message });
  }
};

exports.search = async (req, res) => {
  const { query } = req.query;

  try {
    const leads = await Lead.find({ $text: { $search: query } });

    res.status(200).json({ leads });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.status(200).json(lead);
  } catch (err) {
    console.log('Error in getting lead by ID:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.status(200).json(lead);
  } catch (err) {
    console.log('Error in updating lead:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.status(200).json(lead);
  } catch (err) {
    console.log('Error in deleting lead:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
