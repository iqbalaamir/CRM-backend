const Contact = require('../models/contact.model');

// Create a new contact
exports.create = async (req, res) => {
  try {
    const newContact = new Contact({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      createdBy: req.user._id
    });

    const createdContact = await newContact.save();
    res.status(201).send(createdContact);
  } catch (err) {
    console.log("error in creating contact : ", err.message);
    res.status(500).send({
      message: "Internal server error"
    });
  }
};

// Get all contacts
exports.readAll = async (req, res) => {
  try {
    const contacts = await Contact.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.send(contacts);
  } catch (err) {
    console.log("error in getting contacts : ", err.message);
    res.status(500).send({
      message: "Internal server error"
    });
  }
};

// Get a contact by id
exports.readById = async (req, res) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, createdBy: req.user._id });
    if (!contact) {
      return res.status(404).send({ message: 'Contact not found' });
    }
    res.send(contact);
  } catch (err) {
    console.log("error in getting contact by id : ", err.message);
    res.status(500).send({
      message: "Internal server error"
    });
  }
};

// Update a contact by id
exports.update = async (req, res) => {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
      },
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).send({ message: 'Contact not found' });
    }
    res.send(updatedContact);
  } catch (err) {
    console.log("error in updating contact : ", err.message);
    res.status(500).send({
      message: "Internal server error"
    });
  }
};
// Delete a contact by id
exports.delete = async (req, res) => {
    try {
      const deletedContact = await Contact.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
      if (!deletedContact) {
        return res.status(404).send({ message: 'Contact not found' });
      }
    } catch (err) {
      console.log("error in deleting contact : ", err.message);
      res.status(500).send({
        message: "Internal server error"
      });
    }
  }
  
