const Test = require("../models/test.models.js");

const asyncHandler = require("../utills/asynchandler.js");

const createTest = asyncHandler(async(req, res)=>{
    const {title, description}= req.body;
    console.log(req.body);
    if(!title || !description){
        console.log("title or description is missing");
        return res.status(400).send("title or description is missing");

    }

    const test= await Test.create({title, description});

    return res.status(201).json(test);
    console.log(test);
});

module.exports={createTest};