const mongoose=require("mongoose")

const food= new mongoose.Schema({
   label : String,
   url : String,
},{timestamps:true})

const model = new mongoose.model("gallery",food)

module.exports=model