const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const socketController = require('./controller/socketController');

const indexRouter = require('./routes/index');

//server setup
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const ExpressPeerServer = require('peer').ExpressPeerServer;
const peerServer = ExpressPeerServer(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use('/peerjs',peerServer);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
socketController(io);

app.use('/', indexRouter);

// socket handler

module.exports = { app: app, server: server};
