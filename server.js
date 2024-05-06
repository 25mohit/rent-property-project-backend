require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const UserRoute = require('./Routes/UserRoutes');

const app = express();

// Body parser middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(PORT,() => {
        console.log(`Server is Connect to DB and Running on PORT : ${PORT}`)
    })
})
.catch((err) => console.log(`Getting Error while connecting to DB ${err}`))

// Routes
app.use('/users', UserRoute);

const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
