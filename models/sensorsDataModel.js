const mongoose = require("mongoose");
const sensorDataSchema = new mongoose.Schema({
    plant_id:{type:String,required:true,ref:"SolarPlantSchema"},
    inverter_id:{type:String,required:true,ref:"SolarInverterSchema"},
    customer_id:{type:String,required:true,ref:"CustomerSchema"},
    // Real-time metrics from the sensors
    humidity:{type:String,default:"NA"},
    temperature:{type:String,default:"NA"},
    timestamp:{type:Date,default:Date.now},
    created_at:{type:Date,default:Date.now},
});

module.exports = mongoose.model("SensorDataSchema",sensorDataSchema)