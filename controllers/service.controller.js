const Service = require('../models/service.model');

exports.create = async (req, res) => {
  try {
    const newService = new Service(req.body);
    const createdService = await newService.save();
    res.status(201).send(createdService);
  } catch (err) {
    console.log("error in creating service : ", err.message);
    res.status(500).send({
      message: "Internal server error"
    });
  }
};

exports.readAll = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).send(services);
  } catch (err) {
    console.log("error in reading services : ", err.message);
    res.status(500).send({
      message: "Internal server error"
    });
  }
};

exports.readOne = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).send({
        message: "Service not found"
      });
    }
    res.status(200).send(service);
  } catch (err) {
    console.log("error in reading service : ", err.message);
    res.status(500).send({
      message: "Internal server error"
    });
  }
};

exports.update = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) {
      return res.status(404).send({
        message: "Service not found"
      });
    }
    res.status(200).send(service);
  } catch (err) {
    console.log("error in updating service : ", err.message);
    res.status(500).send({
      message: "Internal server error"
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).send({
        message: "Service not found"
      });
    }
    res.status(200).send({
      message: "Service deleted successfully"
    });
  } catch (err) {
    console.log("error in deleting service : ", err.message);
    res.status(500).send({
      message: "Internal server error"
    });
  }
};
