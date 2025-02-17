const express = require("express");
const inverterController  = require('../controller/create-inverter-controller');
const routes = express.Router();

routes.post('/create-inverter', inverterController.createInverter);
routes.post('/get-inverter', inverterController.getInverterById);
routes.post('/get-all-inverter', inverterController.getAllInverters);
routes.put('/update-inverter/:id', inverterController.updateInverter);
routes.delete('/delete-inverter/:id', inverterController.deleteInverter);
module.exports = routes 