const express = require('express');
const mongoose = require('mongoose');
const requireAll = require('require-all');
const ForestAdmin = require('forest-express-mongoose');

const models = requireAll({
  dirname: `${__dirname}/models`,
  filter: /(.+)\.js$/,
});
const app = express();

ForestAdmin.init({
  modelsDir: `${__dirname}/models`,
  envSecret: process.env.FOREST_ENV_SECRET,
  authSecret: process.env.FOREST_AUTH_SECRET,
  mongoose,
  expressApp: app,
  sequelize: null,
  models,
});