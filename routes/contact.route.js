const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contact.controller');
const {authJwt} = require('../middlewares/index');

router.get('/', [authJwt.isAdminOrManager], contactController.readAll);
router.post('/create', [authJwt.isAdminOrManager], contactController.create);
router.get('/:id', [authJwt.isAdminOrManager], contactController.readById);
router.put('/update/:id', [authJwt.isAdminOrManager], contactController.update);
router.delete('/delete/:id', [authJwt.isAdminOrManager], contactController.delete);



module.exports  = router;