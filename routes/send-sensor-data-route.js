const express = require("express");
const sendSensorsData = require("../controller/sendSensorsData");
const router = express.Router();
router.post("/send-sensor-data", sendSensorsData.sendSensorsData);  
module.exports = router
