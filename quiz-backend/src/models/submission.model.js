const mongoose = require("mongoose");
const { Schema } = mongoose;

const submissionSchema = new Schema({

  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
   
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    
  }, 

  selections: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
      },
      options: {
        type: String,  
        required: true
      },
      saveAt: {
        type: Date,
        default: Date.now
      }
    }
  ]

});

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
