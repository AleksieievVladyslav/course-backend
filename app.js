const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const userRouter = require('./app/routers/user')

const app = express();

mongoose.connect(`mongodb+srv://admin:admin@cluster0-dnfdv.mongodb.net/database?retryWrites=true&w=majority`, { 
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors())
app.use(morgan('dev'))
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/user', userRouter);

module.exports = app;