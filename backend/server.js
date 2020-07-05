//add in required node modules
const express = require('express'); //web framework for node.js
const cors = require('cors'); //cross-origin resource sharing, allow AJAC request to skip same-origin policy and access resource from remote host
const mongoose = require('mongoose');

require('dotenv').config(); //loads environment variable from .env file into process.env

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//establish mongoose database connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//API Endpoints Registry
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});