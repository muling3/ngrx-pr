const mongoose = require('mongoose')

module.exports = async(cb) => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        cb("Successfully connected to database", null)
    } catch (error) {
        cb("Error Occurred: Check your connection URI", error)
    }
}
