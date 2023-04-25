const User = require('../models/user.model');
const objectConverter = require('../utils/objectConverter');
const constants = require('../utils/constants');
const bcrypt = require('bcryptjs');

exports.findAllUser = async (req, res) => {
    try{

        const queryObj = {};

        if(req.query.userType){
            queryObj.userType = req.query.userType
        }

        if(req.query.userStatus){
            queryObj.userStatus = req.query.userStatus
        }

        const users = await User.find(queryObj);

        res.status(200).send(objectConverter.userResponse(users))

    }catch(err){
        console.log("Error in find all user in user controller : ", err.message)
        res.status(500).send({
            message : "Internal Server Error !!!"
        })
    }
};

exports.findByUserId = async (req, res) => {
    try{
        console.log(req.params.id)
        const user = await User.findOne({userId : req.params.id});
        res.status(200).send(user)

    }catch(err){
        console.log("Error in find by user id :", err.message);
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}

exports.update = async (req, res) => {
    try{
        console.log(req.body,"body")
        const user = await User.findById(req.params.id);
        user.userType = req.body.userType != undefined ? req.body.userType : user.userType;
        user.userStatus = req.body.userStatus != undefined ? req.body.userStatus : user.userStatus;
        user.name = req.body.name != undefined ? req.body.name : user.name
        user.email = req.body.email != undefined ? req.body.email : user.email
        user.editLeads = req.body.editLeads != undefined ? req.body.editLeads : user.editLeads
        user.searchLeads = req.body.searchLeads != undefined ? req.body.searchLeads : user.searchLeads
        user.viewLeads = req.body.viewLeads != undefined ? req.body.viewLeads : user.viewLeads
        user.deleteLeads = req.body.deleteLeads != undefined ? req.body.deleteLeads : user.deleteLeads
        user.editContact = req.body.editContact != undefined ? req.body.editContact : user.editContact
        user.viewContact = req.body.viewContact != undefined ? req.body.viewContact : user.viewContact
        user.searchContact = req.body.searchContact != undefined ? req.body.searchContact : user.searchContact
        user.deleteContact = req.body.deleteContact != undefined ? req.body.deleteContact : user.deleteContact
        user.editService = req.body.editService != undefined ? req.body.editService : user.editService
        user.viewService = req.body.viewService != undefined ? req.body.viewService : user.viewService
        user.searchService = req.body.searchService != undefined ? req.body.searchService : user.searchService
        user.deleteService = req.body.deleteService != undefined ? req.body.deleteService : user.deleteService


        const updatedUser = await user.save();
        res.status(200).send({
            id:updatedUser._id,
            name : updatedUser.name,
            email : updatedUser.email,
            userType : updatedUser.userType,
            userStatus : updatedUser.userStatus,
            editLeads:updatedUser.editLeads,
            searchLeads:updatedUser.searchLeads,
            deleteLeads:updatedUser.deleteLeads,
            viewLeads:updatedUser.searchLeads,
            editService:updatedUser.editService,
            searchService:updatedUser.searchLeads,
            viewService:updatedUser.viewService,
            deleteService:updatedUser.deleteService,
            editContact:updatedUser.editContact,
            searchContact:updatedUser.searchContact,
            viewContact:updatedUser.viewContact,
            deleteContact:updatedUser.deleteContact
        })

    }catch(err){
        console.log("error in updating user data : ", err.message);
        res.status(500).send({
            message : "Internal server error"
        })
    }
}

exports.create = async (req, res) => {
    try {
        const lastUser = await User.findOne({}, {}, { sort: { 'userId': -1 } }); // Find the last user with the highest userId
        const newUserId = lastUser ? lastUser.userId + 1 : 1; // Increment the userId by 1 or set it to 1 if there's no last user
        console.log(req.body)
        const newUser = new User({
            userId: newUserId,
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            userType: req.body.userType,
            userStatus: req.body.userStatus,
            editLeads:req.body.editLeads,
            searchLeads:req.body.searchLeads,
            deleteLeads:req.body.deleteLeads,
            viewLeads:req.body.searchLeads,
            editService:req.body.editService,
            searchService:req.body.searchLeads,
            viewService:req.body.viewService,
            deleteService:req.body.deleteService,
            editContact:req.body.editContact,
            searchContact:req.body.searchContact,
            viewContact:req.body.viewContact,
            deleteContact:req.body.deleteContact
        });

        const createdUser = await newUser.save();
        res.status(201).send({
            userId: createdUser.userId,
            name: createdUser.name,
            email: createdUser.email,
            userType: createdUser.userType,
            userStatus: createdUser.userStatus
        });
    } catch (err) {
        console.log("error in creating user : ", err.message);
        res.status(500).send({
            message: "Internal server error"
        });
    }
}

exports.delete = async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ userId: req.params.id });

        if (!deletedUser) {
            return res.status(404).send({
                message: "User not found"
            });
        }

        res.status(200).send({
            userId: deletedUser.userId,
            name: deletedUser.name,
            email: deletedUser.email,
            userType: deletedUser.userType,
            userStatus: deletedUser.userStatus
        });
    } catch (err) {
        console.log("error in deleting user : ", err.message);
        res.status(500).send({
            message: "Internal server error"
        });
    }
}

exports.updateUserStatus = async (req, res) => {
    const { id } = req.params;
    const { userStatus } = req.body;
  
    try {
      // Update user status in the database
      const updatedUser = await User.findByIdAndUpdate(id, { userStatus }, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
