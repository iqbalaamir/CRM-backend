
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const serverConfig = require('../configs/server.config');
const constants = require('../utils/constants');


const verifyToken = (req, res, next) => {
    const authHeader = req.headers['x-access-token'];
    const token = authHeader;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, serverConfig.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden',err });
        }
        req.user = user.user;
        next();
    });

};

const isAdminOrManager = (req, res, next) => {
    const userType = req.user.userType;
    console.log(userType)
    if (userType === 'ADMIN' || userType === 'MANAGER') {
        next();
    } else {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};
const isAdminOrOwner = async (req, res, next) => {
    try {
        const user = await User.findOne({ userId: req.userId });
        if (user.userType == constants.userType.admin || user.userId == req.params.id) {
            next()
        } else {
            return res.status(403).send({
                message: "Failed !! Only Admin and Owner can make this call !!!"
            })
        }

    } catch (err) {
        console.log("error in validation userid in params: ", err.message);
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
}
const isValidUserIdInParams = async (req, res, next) => {
    try {

        const user = await User.find({ id: req.params });

        if (user.length == 0) {
            return res.status(400).send({
                message: "Failed !! UserId passed doesn't exists !!!"
            })
        }

        next()

    } catch (err) {
        console.log("error in validation userid in params: ", err.message);
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
};

const isAdminOrManagerOrOwner = async (req, res, next) => {
    try {
        const user = await User.findOne({ userId: req.userId });
        if (user.userType == constants.userType.admin || user.userId == req.params.id) {
            next()
        } else {
            return res.status(403).send({
                message: "Failed !! Only Admin and Owner can make this call !!!"
            })
        }

    } catch (err) {
        console.log("error in validation userid in params: ", err.message);
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

const validateUserTypeAndUserStatusUpdateRequest = async (req, res, next) => {
    try {

        const user = await User.findOne( req.params );


        if (((req.body.userType && req.body.userType != user.userType) || (req.body.userStatus && req.body.userStatus != user.userStatus)) && user.userType != constants.userType.admin) {

            return res.status(403).send({
                message: "Failed !! Only Admin can Update the data !!!"
            })
        }
        next()

    } catch (err) {
        console.log("error in validation validateUserTypeAndUserStatusUpdateRequest in params: ", err.message);
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

const isActivated = async (req, res, next) => {
    try {
      const user = await User.findById(req.params);
      if (!user || !user.activated) {
        return res.status(401).json({ message: 'User not activated' });
      }
      next();
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

const authRequestValidator = {
    verifyToken: verifyToken,
    isAdminOrManager: isAdminOrManager,
    isActivated:isActivated,
    isAdminOrOwner: isAdminOrOwner,
    isValidUserIdInParams: isValidUserIdInParams,
    validateUserTypeAndUserStatusUpdateRequest: validateUserTypeAndUserStatusUpdateRequest
}

module.exports = authRequestValidator;