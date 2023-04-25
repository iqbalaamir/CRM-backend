// Index.js

const express = require('express');
const router = express.Router();
const leadeRoute = require('./leads.route');
const authRoute = require('./auth.route');
const contactRoute = require('./contact.route');
const serviceRoute = require('./service.route');
const userRoute = require('./user.route');
const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/contacts',
        route: contactRoute,
    },
    {
        path: '/leads',
        route: leadeRoute,
    },
    {
        path: '/service',
        route: serviceRoute,
    },
    {
        path: '/users',
        route: userRoute,
    }
];
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
module.exports = router;