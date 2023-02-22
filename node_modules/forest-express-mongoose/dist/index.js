"use strict";

/* eslint global-require: 0 */
var P = require('bluebird');
var Interface = require('forest-express');
var utils = require('./utils/schema');
var orm = require('./utils/orm');
var Flattener = require('./services/flattener');
var REGEX_VERSION = /(\d+\.)?(\d+\.)?(\*|\d+)/;
exports.collection = Interface.collection;
exports.ensureAuthenticated = Interface.ensureAuthenticated;
exports.errorHandler = function () {
  return Interface.errorHandler({
    logger: Interface.logger
  });
};
exports.StatSerializer = Interface.StatSerializer;
exports.ResourceSerializer = Interface.ResourceSerializer;
exports.PermissionMiddlewareCreator = Interface.PermissionMiddlewareCreator;
exports.deactivateCountMiddleware = Interface.deactivateCountMiddleware;
exports.RecordsCounter = Interface.RecordsCounter;
exports.RecordsExporter = Interface.RecordsExporter;
exports.RecordsGetter = Interface.RecordsGetter;
exports.RecordGetter = Interface.RecordGetter;
exports.RecordUpdater = Interface.RecordUpdater;
exports.RecordCreator = Interface.RecordCreator;
exports.RecordRemover = Interface.RecordRemover;
exports.RecordsRemover = Interface.RecordsRemover;
exports.RecordSerializer = Interface.RecordSerializer;
exports.requestUnflattener = Flattener.requestUnflattener;
exports.PUBLIC_ROUTES = Interface.PUBLIC_ROUTES;
exports.init = function (opts) {
  exports.opts = opts;
  if (!opts.objectMapping) {
    Interface.logger.error('The objectMapping option appears to be missing. Please make sure it is set correctly.');
    return Promise.resolve(function () {});
  }
  if (opts.mongoose) {
    Interface.logger.warn('The mongoose option is not supported anymore. Please remove this option.');
  }
  opts.Mongoose = opts.objectMapping;
  opts.useMultipleDatabases = Object.keys(opts.connections).length > 1;
  exports.getLianaName = function () {
    return 'forest-express-mongoose';
  };
  exports.getLianaVersion = function () {
    var lianaVersion = require('../package.json').version.match(REGEX_VERSION);
    if (lianaVersion && lianaVersion[0]) {
      return lianaVersion[0];
    }
    return null;
  };
  exports.getOrmVersion = function () {
    return orm.getVersion(opts.Mongoose);
  };
  exports.getDatabaseType = function () {
    return opts.useMultipleDatabases ? 'multiple' : 'MongoDB';
  };
  exports.SchemaAdapter = require('./adapters/mongoose');
  exports.getModelName = utils.getModelName;
  // TODO: Remove nameOld attribute once the lianas versions older than 2.0.0 are minority
  exports.getModelNameOld = utils.getModelNameOld;
  exports.ResourcesGetter = require('./services/resources-getter');
  exports.ResourceGetter = require('./services/resource-getter');
  exports.ResourceCreator = require('./services/resource-creator');
  exports.ResourceUpdater = require('./services/resource-updater');
  exports.ResourceRemover = require('./services/resource-remover');
  exports.ResourcesExporter = require('./services/resources-exporter');
  exports.ResourcesRemover = require('./services/resources-remover');
  exports.EmbeddedDocumentUpdater = require('./services/embedded-document-updater');
  exports.HasManyGetter = require('./services/has-many-getter');
  exports.HasManyAssociator = require('./services/has-many-associator');
  exports.HasManyDissociator = require('./services/has-many-dissociator');
  exports.BelongsToUpdater = require('./services/belongs-to-updater');
  exports.ValueStatGetter = require('./services/value-stat-getter');
  exports.PieStatGetter = require('./services/pie-stat-getter');
  exports.LineStatGetter = require('./services/line-stat-getter');
  exports.RecordsDecorator = require('./utils/records-decorator');
  exports.Flattener = Flattener;
  exports.Stripe = {
    getCustomer: function getCustomer(customerModel, customerField, customerId) {
      return new P(function (resolve, reject) {
        if (customerId) {
          return customerModel.findById(customerId).lean().exec(function (err, customer) {
            if (err) {
              return reject(err);
            }
            if (!customer || !customer[customerField]) {
              return reject();
            }
            return resolve(customer);
          });
        }
        return resolve();
      });
    },
    getCustomerByUserField: function getCustomerByUserField(customerModel, customerField, userField) {
      return new P(function (resolve, reject) {
        if (!customerModel) {
          return resolve(null);
        }
        var query = {};
        query[customerField] = userField;
        return customerModel.findOne(query).lean().exec(function (err, customer) {
          if (err) {
            return reject(err);
          }
          return resolve(customer);
        });
      });
    }
  };
  exports.Intercom = {
    getCustomer: function getCustomer(userModel, customerId) {
      return new P(function (resolve, reject) {
        if (customerId) {
          return userModel.findById(customerId).lean().exec(function (err, customer) {
            if (err) {
              return reject(err);
            }
            if (!customer) {
              return reject();
            }
            return resolve(customer);
          });
        }
        return resolve();
      });
    }
  };
  exports.Mixpanel = {
    getUser: function getUser(userModel, userId) {
      if (userId) {
        return userModel.findById(userId).then(function (user) {
          return user.toJSON();
        });
      }
      return P.resolve();
    }
  };
  exports.Layer = {
    getUser: function getUser(customerModel, customerField, customerId) {
      return new P(function (resolve, reject) {
        if (customerId) {
          return customerModel.findById(customerId).lean().exec(function (err, customer) {
            if (err) {
              return reject(err);
            }
            if (!customer || !customer[customerField]) {
              return reject();
            }
            return resolve(customer);
          });
        }
        return resolve();
      });
    }
  };
  return Interface.init(exports);
};