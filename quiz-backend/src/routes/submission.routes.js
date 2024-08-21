const express= require("express");
const router= express.Router();

const {submitTest}= require("../controllers/submission.controllers.js");
const {totalMarks} = require("../controllers/submission.controllers.js");

router.post("/submittest", submitTest);
router.get("/finalmarks", totalMarks);

module.exports=router;