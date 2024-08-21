const mongoose= require("mongoose");
const {Schema} = require("mongoose");

const testSchema= new Schema({
   title:{
    type:String,
    required:true
   }, 

   description:{
    type:String,
    required:true
   },

   questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  }], 
   
   isDeleted: {
    type: Boolean,
    default: false,
  },

  createdAt:{
    type: String,
    default: new Date().toISOString(),
  },

  updatedAt:{
    type:String,
    default: new Date().toISOString(),
  }

});

const Test=mongoose.model("Test", testSchema);

module.exports=Test;