const express = require("express");
const router= express.Router();

const {createTest}= require("../controllers/test.controllers.js");

router.post("/createtest", createTest);

module.exports= router;