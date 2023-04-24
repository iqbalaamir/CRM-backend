const userController = require('../controllers/user.controller');
const {authJwt} = require('../middlewares/index');


module.exports = (app) => {

    app.get('/crm/api/v1/users' , [authJwt.verifyToken ], userController.findAllUser);

    app.get('/crm/api/v1/users/:id', [authJwt.verifyToken, authJwt.isValidUserIdInParams, authJwt.isAdminOrManager], userController.findByUserId);

    app.put('/crm/api/v1/users/:id', [authJwt.verifyToken, authJwt.isAdminOrManager], userController.update);

    app.post('/crm/api/v1/users/create', [authJwt.verifyToken, authJwt.isAdminOrManager, authJwt.validateUserTypeAndUserStatusUpdateRequest ], userController.create);

    app.delete('/crm/api/v1/users/:id', [authJwt.verifyToken, authJwt.isAdminOrManager,authJwt.isAdminOrManager], userController.delete);

    app.put('/crm/api/v1/users/statusUpdate/:id',userController.updateUserStatus);

}