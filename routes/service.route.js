
const express = require('express');
const router = express.Router();

const serviceController = require('../controllers/service.controller');

router.get('/', serviceController.readAll);
router.post('/create', serviceController.create);
router.get('/read/:id', serviceController.readOne);
router.put('/update/:id', serviceController.update);
router.delete('/delete/:id', serviceController.delete);



module.exports  = router;