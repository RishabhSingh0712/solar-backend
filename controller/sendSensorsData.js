const sensorDataModel = require("../models/sensorsDataModel");
const { emitSensorData } = require("../utils/socket");

const sendSensorsData = async (req, res) => {
    try {
        const { plant_id, inverter_id, customer_id, humidity, temperature } = req.body;
        const newSensorData = new sensorDataModel({
            plant_id,
            inverter_id,
            customer_id,
            humidity,   
            temperature,
        });
        const savedSensorData = await newSensorData.save();
        if(savedSensorData){
            emitSensorData(savedSensorData);
            res.status(200).json(savedSensorData);
        }else{
            res.status(404).json({ error: "Failed to save sensor data" });
        }
       
    } catch (error) {
        console.log("Error saving sensor data:", error);
        res.status(500).json({ error: error.message });
    }
};
module.exports = {sendSensorsData};