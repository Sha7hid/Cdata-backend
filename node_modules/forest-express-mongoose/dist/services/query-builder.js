"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _lodash = _interopRequireDefault(require("lodash"));
var _forestExpress = _interopRequireDefault(require("forest-express"));
var _schema = _interopRequireDefault(require("../utils/schema"));
var _orm = _interopRequireDefault(require("../utils/orm"));
var _searchBuilder = _interopRequireDefault(require("./search-builder"));
var _filtersParser = _interopRequireDefault(require("./filters-parser"));
var _projectionBuilder = _interopRequireDefault(require("./projection-builder"));
var _flattener = _interopRequireDefault(require("./flattener"));
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
var QueryBuilder = /*#__PURE__*/function () {
  function QueryBuilder(model, params, opts) {
    (0, _classCallCheck2["default"])(this, QueryBuilder);
    this._model = model;
    this._params = params;
    this._opts = opts;
    this._schema = _forestExpress["default"].Schemas.schemas[_schema["default"].getModelName(this._model)];
    this._searchBuilder = new _searchBuilder["default"](this._model, this._opts, this._params, this._schema.searchFields);
    this._filterParser = new _filtersParser["default"](this._model, this._params.timezone, this._opts);
    this._projectionBuilder = new _projectionBuilder["default"](this._schema);
  }
  (0, _createClass2["default"])(QueryBuilder, [{
    key: "getFieldNamesRequested",
    value: function () {
      var _getFieldNamesRequested = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var associations, _this$_params$sort$sp, _this$_params$sort$sp2, associationFromSorting;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(!this._params.fields || !this._params.fields[this._model.modelName])) {
                _context.next = 2;
                break;
              }
              return _context.abrupt("return", null);
            case 2:
              if (!this._params.filters) {
                _context.next = 8;
                break;
              }
              _context.next = 5;
              return this._filterParser.getAssociations(this._params.filters);
            case 5:
              _context.t0 = _context.sent;
              _context.next = 9;
              break;
            case 8:
              _context.t0 = [];
            case 9:
              associations = _context.t0;
              if (this._params.sort && this._params.sort.includes('.')) {
                _this$_params$sort$sp = this._params.sort.split('.'), _this$_params$sort$sp2 = (0, _slicedToArray2["default"])(_this$_params$sort$sp, 1), associationFromSorting = _this$_params$sort$sp2[0];
                if (associationFromSorting[0] === '-') {
                  associationFromSorting = associationFromSorting.substring(1);
                }
                associations.push(associationFromSorting);
              }
              return _context.abrupt("return", _lodash["default"].union(this._params.fields[this._model.modelName].split(','), associations));
            case 12:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function getFieldNamesRequested() {
        return _getFieldNamesRequested.apply(this, arguments);
      }
      return getFieldNamesRequested;
    }()
  }, {
    key: "addProjection",
    value: function () {
      var _addProjection = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(jsonQuery) {
        var fieldNames, projection;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.getFieldNamesRequested();
            case 2:
              fieldNames = _context2.sent;
              _context2.next = 5;
              return this._projectionBuilder.getProjection(fieldNames);
            case 5:
              projection = _context2.sent;
              return _context2.abrupt("return", projection && jsonQuery.push(projection));
            case 7:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function addProjection(_x) {
        return _addProjection.apply(this, arguments);
      }
      return addProjection;
    }()
  }, {
    key: "addJoinToQuery",
    value: function addJoinToQuery(field, joinQuery) {
      if (field.reference && !field.isVirtual && !field.integration) {
        if (QueryBuilder._joinAlreadyExists(field, joinQuery)) return this;
        var referencedKey = _schema["default"].getReferenceField(field.reference);
        var subModel = _schema["default"].getReferenceModel(this._opts, field.reference);
        var unflattenedFieldName = _flattener["default"].unflattenFieldName(field.field);
        joinQuery.push({
          $lookup: {
            from: subModel.collection.name,
            localField: unflattenedFieldName,
            foreignField: referencedKey,
            as: unflattenedFieldName
          }
        });
        var fieldPath = unflattenedFieldName && this._model.schema.path(unflattenedFieldName);
        if (fieldPath && fieldPath.instance !== 'Array') {
          joinQuery.push({
            $unwind: {
              path: "$".concat(unflattenedFieldName),
              preserveNullAndEmptyArrays: true
            }
          });
        }
      }
      return this;
    }
  }, {
    key: "joinAllReferences",
    value: function () {
      var _joinAllReferences = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(jsonQuery, alreadyJoinedQuery) {
        var _this = this;
        var fieldNames, flattenReferenceNames;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.getFieldNamesRequested();
            case 2:
              fieldNames = _context3.sent;
              flattenReferenceNames = _flattener["default"].getFlattenedReferenceFieldsFromParams(this._model.modelName, this._params.fields);
              fieldNames = flattenReferenceNames.concat(fieldNames);
              this._schema.fields.forEach(function (field) {
                if (fieldNames && !fieldNames.includes(field.field) || QueryBuilder._joinAlreadyExists(field, alreadyJoinedQuery)) {
                  return;
                }
                _this.addJoinToQuery(field, jsonQuery);
              });
              return _context3.abrupt("return", this);
            case 7:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function joinAllReferences(_x2, _x3) {
        return _joinAllReferences.apply(this, arguments);
      }
      return joinAllReferences;
    }()
  }, {
    key: "_addFiltersToQuery",
    value: function () {
      var _addFiltersToQuery2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(jsonQuery) {
        var newFilters, newFiltersString;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this._filterParser.replaceAllReferences(this._params.filters);
            case 2:
              newFilters = _context4.sent;
              newFiltersString = JSON.stringify(newFilters);
              _context4.t0 = jsonQuery;
              _context4.next = 7;
              return this._filterParser.perform(newFiltersString);
            case 7:
              _context4.t1 = _context4.sent;
              _context4.t0.push.call(_context4.t0, _context4.t1);
            case 9:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function _addFiltersToQuery(_x4) {
        return _addFiltersToQuery2.apply(this, arguments);
      }
      return _addFiltersToQuery;
    }()
  }, {
    key: "addSortToQuery",
    value: function addSortToQuery(jsonQuery) {
      var order = this._params.sort.startsWith('-') ? -1 : 1;
      var sortParam = order > 0 ? this._params.sort : this._params.sort.substring(1);
      if (this._params.sort.split('.').length > 1) {
        var _this$_params$sort$sp3 = this._params.sort.split('.');
        var _this$_params$sort$sp4 = (0, _slicedToArray2["default"])(_this$_params$sort$sp3, 1);
        sortParam = _this$_params$sort$sp4[0];
        var _this$_params$sort$sp5 = this._params.sort.split('.'),
          _this$_params$sort$sp6 = (0, _slicedToArray2["default"])(_this$_params$sort$sp5, 1),
          association = _this$_params$sort$sp6[0];
        this.addJoinToQuery(association, jsonQuery);
      }
      if (_flattener["default"]._isFieldFlattened(sortParam)) sortParam = _flattener["default"].unflattenFieldName(sortParam);
      jsonQuery.push({
        $sort: (0, _defineProperty2["default"])({}, sortParam, order)
      });
      return this;
    }
  }, {
    key: "addSkipAndLimitToQuery",
    value: function addSkipAndLimitToQuery(jsonQuery) {
      jsonQuery.push({
        $skip: this._getSkip()
      });
      jsonQuery.push({
        $limit: this._getLimit()
      });
      return this;
    }
  }, {
    key: "addCountToQuery",
    value: function addCountToQuery(jsonQuery) {
      if (_orm["default"].hasRequiredVersion(this._opts.Mongoose, '3.4')) {
        jsonQuery.push({
          $count: 'count'
        });
      } else {
        jsonQuery.push({
          $group: {
            _id: null,
            count: {
              $sum: 1
            }
          }
        });
      }
      return this;
    }
  }, {
    key: "_hasPagination",
    value: function _hasPagination() {
      return this._params.page && this._params.page.number;
    }
  }, {
    key: "_getLimit",
    value: function _getLimit() {
      return this._hasPagination() && this._params.page.size ? Number.parseInt(this._params.page.size, 10) : 10;
    }
  }, {
    key: "_getSkip",
    value: function _getSkip() {
      return this._hasPagination() ? (Number.parseInt(this._params.page.number, 10) - 1) * this._getLimit() : 0;
    }
  }, {
    key: "hasSmartFieldSearch",
    value: function hasSmartFieldSearch() {
      return this._searchBuilder.hasSmartFieldSearch;
    }
  }, {
    key: "getFieldsSearched",
    value: function getFieldsSearched() {
      return this._searchBuilder.getFieldsSearched();
    }
  }, {
    key: "getQueryWithFiltersAndJoins",
    value: function () {
      var _getQueryWithFiltersAndJoins = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(segment) {
        var jsonQuery;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              jsonQuery = [];
              _context5.next = 3;
              return this.addFiltersAndJoins(jsonQuery, segment);
            case 3:
              return _context5.abrupt("return", jsonQuery);
            case 4:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function getQueryWithFiltersAndJoins(_x5) {
        return _getQueryWithFiltersAndJoins.apply(this, arguments);
      }
      return getQueryWithFiltersAndJoins;
    }()
  }, {
    key: "addFiltersAndJoins",
    value: function () {
      var _addFiltersAndJoins = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(jsonQuery, segment) {
        var conditions;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              conditions = [];
              if (!this._params.filters) {
                _context6.next = 4;
                break;
              }
              _context6.next = 4;
              return this._addFiltersToQuery(conditions);
            case 4:
              if (!this._params.search) {
                _context6.next = 7;
                break;
              }
              _context6.next = 7;
              return this._searchBuilder.getWhere(conditions);
            case 7:
              if (segment) {
                conditions.push(segment.where);
              }
              if (conditions.length) {
                jsonQuery.push({
                  $match: {
                    $and: conditions
                  }
                });
              }
              return _context6.abrupt("return", this);
            case 10:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function addFiltersAndJoins(_x6, _x7) {
        return _addFiltersAndJoins.apply(this, arguments);
      }
      return addFiltersAndJoins;
    }()
  }], [{
    key: "_joinAlreadyExists",
    value: function _joinAlreadyExists(field, joinQuery) {
      return !!_lodash["default"].find(joinQuery, function (join) {
        return join && join.$lookup && join.$lookup.as === field.field;
      });
    }
  }]);
  return QueryBuilder;
}();
module.exports = QueryBuilder;