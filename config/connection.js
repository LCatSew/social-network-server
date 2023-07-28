const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/socialDB';

// Create and export the MongoDB connection
mongoose.connect(MONGODB_URI, {
    connectTimeoutMS: 30000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});



module.exports = mongoose.connection;