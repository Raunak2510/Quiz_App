const mongoose= require("mongoose");
const {Schema} = require("mongoose");
const Test = require("./test.models.js");

const questionSchema= new Schema({

    question:{
        type:String,
        required:true,
    }, 

    options:[{
        type:String,
        required:true,
    }],

    testId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test', 
        required:true,
    }, 

    marks:{
        type:Number, 
        required:true
    }, 

    correctOption:{
        type:String,
        required:true
        
    }, 

    createdAt:{
        type: String,
        default: new Date().toISOString(),
      },
    
      updatedAt:{
        type:String,
        default: new Date().toISOString(),
      }

})

questionSchema.post('save', async function (doc, next) {
    try {
      await Test.findByIdAndUpdate(doc.testId, {
        $push: { questions: doc._id }
      });
      next();
    } catch (err) {
      next(err);
    }
  });

const Question=mongoose.model("question", questionSchema);

module.exports=Question;
