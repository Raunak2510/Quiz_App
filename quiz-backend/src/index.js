const dotenv = require('dotenv');

const connectDB= require("./db/index.js");

const app=require("./app.js");

dotenv.config();

connectDB();

const port= process.env.PORT;
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});










