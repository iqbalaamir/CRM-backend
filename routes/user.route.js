
const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const {authJwt} = require('../middlewares/index');

router.get('/' , [authJwt.verifyToken ], userController.findAllUser);

router.get('/:id', [authJwt.verifyToken,  authJwt.isAdminOrManager], userController.findByUserId);

router.put('/update/:id', [authJwt.verifyToken, authJwt.isAdminOrManager], userController.update);

router.post('/create', [authJwt.verifyToken, authJwt.isAdminOrManager, authJwt.validateUserTypeAndUserStatusUpdateRequest ], userController.create);

router.delete('/delete/:id', [authJwt.verifyToken, authJwt.isAdminOrManager,authJwt.isAdminOrManager], userController.delete);

router.put('/statusUpdate/:id',userController.updateUserStatus);



module.exports  = router;