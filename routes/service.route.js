const serviceController = require('../controllers/service.controller');

module.exports = (app) => {
    
// Services routes
app.get('/crm/api/v1/services', serviceController.readAll);
app.post('/crm/api/v1/services', serviceController.create);
app.get('/crm/api/v1/services/:id', serviceController.readOne);
app.put('/crm/api/v1/services/:id', serviceController.update);
app.delete('/crm/api/v1/services/:id', serviceController.delete);
}