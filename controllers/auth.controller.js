const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const constants = require('../utils/constants');
const serverConfig = require('../configs/server.config')


exports.signup = async (req, res) => {

    try{

        if(req.body.userType != constants.userType.employee){
            req.body.userStatus = constants.userStatus.pending
        }
        const lastUser = await User.findOne({}, {}, { sort: { 'userId': -1 } }); // Find the last user with the highest userId
        const newUserId = lastUser ? lastUser.userId + 1 : 1;
        const userObj = {
            name : req.body.name,
            userId : newUserId,
            email : req.body.email,
            password : bcrypt.hashSync(req.body.password, 10),
            userType : req.body.userType,
            userStatus : req.body.userStatus
        }

        const user = await User.create(userObj)

        const response = {
            name : user.name,
            userId : user.userId,
            email : user.email,
            userType : user.userType,
            userStatus : user.userStatus,
            createdAt : user.createdAt,
            updatedAt : user.updatedAtdAt
        }

        res.status(201).send(response);
        console.log("---*new user SignUp*--- : ", "userType :- ", response.userType, "userStatus :- ", user.userStatus)

    }catch(err){
        console.log("Error while signup* : ", err.message);
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
};

exports.signin = async (req, res) => {
    try{

        const user = await User.findOne({email : req.body.email})
        if(!user){
            return res.status(400).send({
                message : "email is not valid"
            })
        }

        if(user.userStatus == constants.userStatus.pending){
            return res.status(400).send({
                message : "Failed !! User is still pending !! Unable to login !!!"
            })
        }
        console.log(req.body.password)
        const isValidPassword = bcrypt.compareSync(req.body.password, user.password);
        if(!isValidPassword){
            return res.status(400).send({
                message : "Failed !! Wrong Password Provided !!!"
            })
        }

        const token = jwt.sign({user : user}, serverConfig.SECRET_KEY, {expiresIn:604800});

        let response = {
            name : user.name,
            email : user.email,
            userType : user.userType,
            userStatus : user.userStatus,
            accessToken : token
        }

        res.status(200).send(response)
        console.log("---*User SignIN*--- : ", "userType :- ", response.userType, "userStatus :- ", user.userStatus)


    }catch(err){
        console.log("Error while signin* : ", err.message);
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
};

