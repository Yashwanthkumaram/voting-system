const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

// Routes
const votersRouter = require('./routes/voters');
const candidatesRouter = require('./routes/candidates');

app.use('/voters', votersRouter);
app.use('/candidates', candidatesRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
