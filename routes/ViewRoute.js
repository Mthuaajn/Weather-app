const express = require('express');
const viewRouter = express.Router();
const viewController = require('../controllers/viewController');

viewRouter.get('/', viewController.getOverview);
viewRouter.get('/current-location', viewController.getCurrentLocation);

viewRouter.post('/search', viewController.getLocationSearch);
viewRouter.get('/search', viewController.getLocationSearch);

viewRouter.post('/subscribed-email', viewController.registerEmail);
viewRouter.post('/unsubscribed-email', viewController.unSubscribe);
viewRouter.get('/send-email', viewController.sendEmail);

module.exports = viewRouter;
