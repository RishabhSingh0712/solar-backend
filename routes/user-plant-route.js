const express = require("express");
const {getCustomerWithPlantDetails} = require('../controller/customer-plants-details');
const {authMiddleware, isAdmin} = require('../middlewares/authMiddleware');
const routes = express.Router();
routes.post('/get-customer-with-plant-details',authMiddleware,isAdmin, getCustomerWithPlantDetails);
module.exports = routes
