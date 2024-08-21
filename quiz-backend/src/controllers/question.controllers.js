
const Question = require("../models/question.models.js");

const asyncHandler = require("../utills/asynchandler.js");

const addQuestion= asyncHandler( async(req, res)=>{
     const {question,options, marks, correctOption , testId}= req.body;
    //  console.log(req.body);

     if(!question || !options || !correctOption){
        console.log("Provie question and options")
        return  res.status(400).send("Question or option are not defined"); 
     }
    
     if (typeof marks !== 'number') {
        console.log("Marks should be a number");
        return res.status(400).send("Marks should be a number");
      }
      
      console.log(typeof options);

    //   if (!options.includes(correctOption)) {
    //     console.log("Correct option must be one of the provided options");
    //     return res.status(400).send("Correct option is not within the provided options");
    //   }
     
      const addedQuestion= await Question.create({question, options, marks,correctOption, testId});

      return res.status(201).json(addedQuestion);
      console.log(addedQuestion);

})


     
const getQuestions = asyncHandler(async (req, res) => {
    const questions = await Question.find({ testId: "66c444fb2b4ebc06763a2598" })
        .select('question options'); 

    if (!questions || questions.length === 0) {
        console.log("Question(s) not found");
        return res.status(400).send("Question(s) not found");
    }

    return res.status(200).json(questions);
});




module.exports= {addQuestion,
    getQuestions
    };