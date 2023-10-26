const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

const connectDB = (url) => {
    // Connecting to the database
    return mongoose.connect(url).then(() => {
            console.log('Connected to DB successfully')
        })

};
module.exports = connectDB