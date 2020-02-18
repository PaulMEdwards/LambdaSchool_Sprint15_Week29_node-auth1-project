const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');
const auth = require('./auth');
const session = require('express-session');

const sessionConfig = {
  name: 'session',
  secret: '5m7tceyhbnq3vmcmtq3vcthz4h7ww874gyabuzsbv3489',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false
};

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(logger);
  // server.use(auth);
  server.use(session(sessionConfig));
};