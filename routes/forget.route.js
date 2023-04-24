const forgotController = require('../controllers/forgot.controller');
const {verifySignUp} = require('../middlewares/index');

module.exports = (app) => {

    app.post('/crm/api/v1/forgot-password', forgotController.forgot);

    app.post('/crm/api/v1/reset-password', forgotController.resetPassword);
}