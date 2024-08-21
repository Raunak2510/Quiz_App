
const mongoose = require("mongoose");
const asyncHandler = require("../utills/asynchandler.js");
const nodemailer = require('nodemailer');

const Submission = require("../models/submission.model.js");
const Question = require("../models/question.models.js");

const submitTest = asyncHandler(async (req, res) => {
    const { selections, userId, testId } = req.body;

    if (!userId) {
        console.log("give user id");
        return res.status(400).send("give user id");
    }

    const submission = new Submission({
        testId: testId,
        userId: userId,
        selections: selections.map(selection => ({
            questionId: selection.questionId,
            options: selection.options
        }))
    });

    await submission.save();
    res.status(201).json({ message: "Test submitted successfully", submission });
});

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    
    auth: {
        user: 'bhardwaj848503@gmail.com',
        pass: 'Raunak@123',
    },
});


const totalMarks = asyncHandler(async (req, res) => {
    var totalMarks = 0;
    const userId = req.body.userId || "66c377a77b073aad48acea8e";  
    const testId = req.body.testId || "66c444fb2b4ebc06763a2598";  

    let totalSubmission = await Submission.findOne({ testId, userId })
        .select('selections');

    if (!totalSubmission) {
        console.log("submission not found");
        return res.status(400).send("submission not found");
    }

    totalSubmission = totalSubmission.selections;

    for (let i = 0; i < totalSubmission.length; i++) {
        let option = totalSubmission[i].options;
        let questionId = totalSubmission[i].questionId;

        let question = await Question.findById(questionId);
        let correctOption = question.correctOption;

        if (option === correctOption) {
            totalMarks += question.marks;
        }
    }

    console.log("total marks: " + totalMarks);

    // Send email with the total marks
    const mailOptions = {
        from: 'bhardwaj848503@gmail.com',
        to: '21mc3027@rgipt.ac.in',  
        subject: 'Your Test Results',
        text: `You scored ${totalMarks} marks in the test.`,
        html: `<h1>Your Test Results</h1><p>You scored <strong>${totalMarks}</strong> marks in the test.</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            return res.status(500).json({ message: "Failed to send email", error });
        } else {
            console.log('Email sent:', info.response);
            return res.status(200).json({ message: `Total marks: ${totalMarks}. Email sent successfully.` });
        }
    });
});

module.exports = {
    submitTest,
    totalMarks
}
