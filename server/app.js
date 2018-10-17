const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users/users');

const app = express();

require('dotenv').config();
// app.use('/uploads', express.static(path.join(__dirname, './public/uploads/default-avatar.jpg')));
app.use('/uploads', express.static(__dirname + '/uploads'));


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', indexRouter);
app.get('/api/uploads/:name', (req,res,next) => {
    res.sendFile(path.join(__dirname, `./uploads/${req.params.name}`))
});

app.use((req, res) => res.sendStatus(404));
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        success: false, message: err.message, name: err.name, errors: err.errors
    });
});

module.exports = app;
