const {sendNotification,getNotifications} = require('../controller/send-Notification-admin');
const {authMiddleware,isAdmin} = require('../middlewares/authMiddleware');
const express = require("express");
const routes = express.Router();
routes.post('/send-notification',authMiddleware,isAdmin, sendNotification);
routes.post('/get-notification',authMiddleware,getNotifications);
module.exports = routes
