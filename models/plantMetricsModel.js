const mongoose = require("mongoose");
const plantMetricSchema = new mongoose.Schema({
    plant_id:{type:String,ref:"SolarPlantSchema"},
    // Technical specifications
    // number_of_panels:{type:Number,required:true},
    number_of_inverters:{type:Number,required:true},
   panel_type:{type:String,required:true,
    enum: ["monocrystalline", "polycrystalline",'thin-film']},
   system_type:{type:String,required:true,
    enum: ["on-grid", "off-grid",'hybrid']},
    //Power output
    max_output_voltage:{type:Number,required:true},
    max_output_current:{type:Number,required:true},
    max_output_power:{type:Number,required:true},
  
    //General Plant 0000000000000 
    total_capacity_kw:{type:Number,required:true},
    installation_date:{type:Date},
    status:{type:String,required:true,default:"active",
        enum:["active","inactive"]
    },
    created_at:{type:Date,default:Date.now},
});
module.exports = mongoose.model("PlantMetricSchema",plantMetricSchema)