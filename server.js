const express = require('express');
const app = express();
require('dotenv').config()
const mongoose = require('mongoose');
const UserRoute = require('./Routes/UserRoutes');
const UtilsRoute = require('./Routes/UtilsRoute')
const ServicesRoute = require('./Routes/ServicesRoute')
var cors = require('cors')
mongoose.set('strictQuery', true)

// Body parser middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

// Routes
var whitelist = ['http://localhost:3000', 'https://relicet-dev.netlify.app']
var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
app.use('/users', cors(corsOptions), UserRoute);
app.use('/utils', cors(corsOptions), UtilsRoute);
app.use('/services', ServicesRoute);

const PORT = process.env.PORT || 5000;
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(PORT,() => {
        console.log(`Server is Connect to DB and Running on PORT : ${PORT}`)
    })
})
.catch((err) => console.log(`Getting Error while connecting to DB ${err}`))

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
