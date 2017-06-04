/**
 * Created by Rico on 9/1/16.
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// ROUTES
var appRoutes = require('./routes/app');
var employerRoutes = require('./routes/employer');
var jobPosts = require('./routes/jobposts');
var uploads = require('./routes/upload');
var userRoutes = require('./routes/user');
var registerRoute = require('./routes/register');


var app = express();
mongoose.connect('localhost:27017/JobBoard');
// mongoose.connect("mongodb://mrico3d:password@ds127428.mlab.com:27428/jobboard");
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname+'\\src\\views\\'));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(cookieParser());
//this was the default start up
// app.use(express.static(path.join(__dirname, 'dist')));

//after me changing to try and find a working upload folder
// app.use(express.static(path.join(__dirname, 'jobBoard/dist')));

app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
	next();
});

app.use('/uploads', uploads);
app.use('/jobposts', jobPosts);
app.use('/register', registerRoute);
app.use('/user', userRoutes);
app.use('/employer', employerRoutes);
app.use('/', appRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.json({
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
