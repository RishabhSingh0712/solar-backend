const mongoose = require("mongoose");
const inverterSchema = new mongoose.Schema({
    plant_id:{type:String,required:true},
    inverter_name:{type:String,required:true},
    inverter_id:{type:String,required:true},
    capacity_kw:{type:Number,required:true},
    installation_date:{type:Date,default:Date.now},
    status:{type:String,required:true,default:"active",
        enum:["active","inactive"]
    },
    
});

module.exports = mongoose.model("SolarInverterSchema",inverterSchema)