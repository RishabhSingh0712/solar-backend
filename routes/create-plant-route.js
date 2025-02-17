const express = require("express");
const createPlant = require('../controller/create-plant');
const routes = express.Router();

routes.post('/create-plant', createPlant.createSolarPlant);
routes.post('/get-plant', createPlant.getSolarPlantById);
routes.get('/get-all-plant', createPlant.getAllSolarPlants);
routes.put('/update-plant', createPlant.updateSolarPlant);
routes.delete('/delete-plant', createPlant.deleteSolarPlant);
module.exports = routes

