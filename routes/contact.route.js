const contactController = require('../controllers/contact.controller');
const {authJwt} = require('../middlewares/index');

// Contacts routes
module.exports = (app) => {
    app.get('/crm/api/v1/contacts', [authJwt.isAdminOrManager], contactController.getContacts);
    app.post('/crm/api/v1/contacts', [authJwt.isAdminOrManager], contactController.createContact);
    app.get('/crm/api/v1/contacts/:id', [authJwt.isAdminOrManager], contactController.getContactById);
    app.put('/crm/api/v1/contacts/:id', [authJwt.isAdminOrManager], contactController.updateContact);
    app.delete('/crm/api/v1/contacts/:id', [authJwt.isAdminOrManager], contactController.deleteContact);
}