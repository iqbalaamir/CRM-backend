const express = require('express');
const router = express.Router();

const leadController = require('../controllers/leads.controller');
const {authJwt} = require('../middlewares/index');


router.get('/', leadController.getLeads);
router.post('/create', [authJwt.verifyToken,authJwt.isAdminOrManager], leadController.createLead);
router.get('/:id', leadController.getLeadById);
router.get('/search',leadController.search);
router.put('/upload/:id', [authJwt.verifyToken,authJwt.isAdminOrManager] , leadController.updateLead);
router.delete('/delete/:id',[authJwt.verifyToken,authJwt.isAdminOrManager] , leadController.deleteLead);

// Leads routes
module.exports  = router;