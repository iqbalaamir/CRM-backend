const mongoose = require('mongoose');
const constants = require("../utils/constants")

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true,
        minLength : 10,
        lowercase : true
    },
    createdAt : {
        type : Date,
        immutable : true,
        default : () => {
            return Date.now()
        }
    },
    activated: {
        type: Boolean,
        default: false,
      },
    updatedAt : {
        type : Date,
        default : () => {
            return Date.now()
        }
    },
    userType : {
        type : String,
        required : true,
        default : constants.userType.employee,
        enum : [constants.userType.employee, constants.userType.admin, constants.userType.manager]
    },
    userStatus : {
        type : String,
        required : true,
        default : constants.userStatus.approved,
        enum : [constants.userStatus.approved, constants.userStatus.pending, constants.userStatus.rejected]
    },
    editLeads: {
        type: Boolean,
        default: false
      },
      searchLeads: {
        type: Boolean,
        default: false
      },
      deleteLeads: {
        type: Boolean,
        default: false
      },
      viewLeads: {
        type: Boolean,
        default: false
      },
      editService: {
        type: Boolean,
        default: false
      },
      searchService: {
        type: Boolean,
        default: false
      },
      viewService: {
        type: Boolean,
        default: false
      },
      deleteService: {
        type: Boolean,
        default: false
      },
      editContact: {
        type: Boolean,
        default: false
      },
      searchContact: {
        type: Boolean,
        default: false
      },
      viewContact: {
        type: Boolean,
        default: false
      },
      deleteContact: {
        type: Boolean,
        default: false
      }
})

module.exports = mongoose.model("user", userSchema);