const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');

const app = express();

const corsOptions = {
    origin: '*', 
    credentials: true, 
    allowedHeaders: ['Content-Type', 'Authorization'], 
  };
  
  app.use(cors(corsOptions));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));
app.use(cookieParser());


const userRoutes = require("./routes/user.routes.js");
const addQuestion= require("./routes/question.routes.js");
const testRoutes= require("./routes/test.routes.js");
const submissionRoutes= require("./routes/submission.routes.js");

app.use("/api/users", userRoutes);
app.use("/api/question", addQuestion);
app.use("/api/test", testRoutes);
app.use("/api/submission", submissionRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;