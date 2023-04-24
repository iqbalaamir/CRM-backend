const leadController = require('../controllers/leads.controller');
const {authJwt} = require('../middlewares/index');


module.exports = (app) => {
    app.get('/crm/api/v1/leads/', leadController.getLeads);
    app.post('/crm/api/v1/leads/create', [authJwt.verifyToken,authJwt.isAdminOrManager], leadController.createLead);
    app.get('/crm/api/v1/lead/:id', leadController.getLeadById);
    app.get('/crm/api/v1/leads/search',leadController.search);
    app.put('/crm/api/v1/lead/:id', [authJwt.verifyToken,authJwt.isAdminOrManager] , leadController.updateLead);
    app.delete('/crm/api/v1/lead/:id',[authJwt.verifyToken,authJwt.isAdminOrManager] , leadController.deleteLead);
}
