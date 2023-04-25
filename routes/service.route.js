const express = require('express');
const router = express.Router();
const {authJwt} = require('../middlewares/index');
const serviceController = require('../controllers/service.controller');

router.get('/', serviceController.readAll);
router.post('/create',authJwt.verifyToken, serviceController.create);
router.get('/read/:id', serviceController.readOne);
router.put('/update/:id',authJwt.verifyToken, serviceController.update);
router.delete('/delete/:id',authJwt.verifyToken, serviceController.delete);



module.exports  = router;