const mongoose = require("mongoose");
const solarInverterDataSchema = new mongoose.Schema({
    plant_id:{type:String,ref:"SolarPlantSchema"},
    inverter_id:{type:String,ref:"SolarInverterSchema"},
    customer_id:{type:String,ref:"CustomerSchema"},
    // Real-time metrics from the inverter
    power_output:{type:Number,required:true},     //Power output in watts
    total_energy_generated:{type:Number,required:true},     //Total energy generated in kWh
    input_voltage:{type:Number,required:true},     // DC Input voltage in volts
    output_voltage:{type:Number,required:true},     // AC Output voltage in volts
    output_current:{type:Number,required:true},     // AC Output current in amperes.
    frequency:{type:Number,required:true},     // AC Output frequency in Hertz
    efficiency:{type:Number,required:true},     // Efficiency of the inverter
    temperature:{type:Number,required:true},     // Temperature of the inverter in degrees Celsius
    status:{type:String,required:true,default:"active",
        enum:["Running","StandBy",'fault'],default:"Running"},


         //Battery information (if applicable)
    battery_voltage:{type:Number}, 
    battery_current:{type:Number},
    battery_capacity:{type:Number},
    battery_state_of_charge:{type:Number},
    battery_temperature:{type:Number},
    battery_status:{type:String,enum:["Charging","Discharging","StandBy","Fault"]},
    battery_health:{type:Number},
    battery_cycles:{type:Number},
      

    timestamp:{type:Date,default:Date.now},
    });

    module.exports = mongoose.model("SolarInverterDataSchema",solarInverterDataSchema);