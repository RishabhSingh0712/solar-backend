const mongoose = require("mongoose");
const solarPlantSchema = new mongoose.Schema({
    customer_id:{type:mongoose.Schema.Types.ObjectId,ref:"CustomerSchema"},
    plant_name:{type:String,required:true},
    plant_id:{type:String,required:true,unique:true},
    capacity_kw:{type:Number,required:true},
    installation_date:{type:Date,default:Date.now},
    location:{type:String,required:true},
    status:{type:String,required:true},
    created_at:{type:Date,default:Date.now},
});

module.exports = mongoose.model("SolarPlantSchema",solarPlantSchema);