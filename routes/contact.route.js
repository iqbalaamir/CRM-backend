const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contact.controller');
const {authJwt} = require('../middlewares/index');

router.get('/', [authJwt.verifyToken], contactController.readAll);
router.post('/create', [authJwt.verifyToken], contactController.create);
router.get('/:id', [authJwt.verifyToken], contactController.readById);
router.put('/update/:id', [authJwt.verifyToken], contactController.update);
router.delete('/delete/:id', [authJwt.verifyToken], contactController.delete);



module.exports  = router;