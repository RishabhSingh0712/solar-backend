const express = require('express');
const getPlantsByCustomerController = require('../controller/customer-plants');
const routes = express.Router();


routes.post('/get-plant',getPlantsByCustomerController.getPlantsByCustomer)
module.exports = routes
