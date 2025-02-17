const mongoose =require('mongoose');
const notificationSchema = new mongoose.Schema({
    customer_id:{type:String,required:true,ref:"CustomerSchema"},
    title:{type:String,required:true},
    message:{type:String,required:true},
    created_at:{type:Date,default:Date.now},            
});

module.exports = mongoose.model("NotificationSchema",notificationSchema);