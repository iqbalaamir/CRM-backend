const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const {verifySignUp,authJwt} = require('../middlewares/index');


const forgotController = require('../controllers/forgot.controller');


router.post('/signup', [verifySignUp.validateSignUpRequestBody], authController.signup);

router.post('/signin', [verifySignUp.validateSignInRequestBody,], authController.signin);

router.post('/forgot-password', forgotController.forgot);

router.post('/reset-password', forgotController.resetPassword);

module.exports  = router;