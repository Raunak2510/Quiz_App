const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.URI}`);
        console.log("db connected");
    } catch (error) {
        console.log(error);
    }
}

module.exports= connectDB;