const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const customerSchema = new mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    email:{type:String,required:true},
    mobile:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,required:true},
    created_at:{type:Date,default:Date.now},
    isVerified: { type: Boolean, default: false } // Add this line 

});


//Password hashing middleware before saving
customerSchema.pre("save",async function(next){
   if(!this.isModified("password")){
    return next();
   }
   const salt = await bcrypt.genSalt(10);
   const hash = await bcrypt.hash(this.password,salt);
   this.password = hash;
   next();

});


module.exports = mongoose.model("CustomerSchema",customerSchema)