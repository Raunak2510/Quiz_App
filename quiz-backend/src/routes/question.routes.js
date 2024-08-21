const express = require("express");
const router= express.Router();

const {addQuestion} = require("../controllers/question.controllers.js");
const {getQuestions} = require("../controllers/question.controllers.js");

router.post("/addquestion", addQuestion);
router.get("/getquestion", getQuestions);

module.exports= router;