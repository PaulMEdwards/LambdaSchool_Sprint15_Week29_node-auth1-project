const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');
const auth = require('./auth');

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(logger);
  // server.use(auth);
};