const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './config.env' });
const ErrorHandlerController = require('./controllers/ErrorController.js');
const viewRouter = require('./routes/ViewRoute.js');
const appError = require('./utils/appError.js');
process.noDeprecation = true;
const app = express();
app.use(morgan('dev'));
// set view pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.json());
app.use(cookieParser());
// 1) global middleware
app.use('/', viewRouter);

app.all('*', (req, res, next) => {
  next(new appError(`Can not find ${req.originalUrl} on server`, 404));
});

app.use(ErrorHandlerController);
module.exports = app;
