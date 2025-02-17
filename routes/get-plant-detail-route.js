const express = require("express");
const getFullPlantDetails = require('../controller/get-plant-detail');
const routes = express.Router();
routes.get("/plant/:plant_id",getFullPlantDetails.getFullPlantDetails)

module.exports = routes; 