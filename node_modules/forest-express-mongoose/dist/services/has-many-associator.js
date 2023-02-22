"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _flattener = _interopRequireDefault(require("./flattener"));
var HasManyAssociator = /*#__PURE__*/function () {
  function HasManyAssociator(model, association, opts, params, data) {
    (0, _classCallCheck2["default"])(this, HasManyAssociator);
    this._model = model;
    this._params = params;
    this._data = data;
  }
  (0, _createClass2["default"])(HasManyAssociator, [{
    key: "perform",
    value: function perform() {
      var updateParams = {};
      updateParams[_flattener["default"].unflattenFieldName(this._params.associationName)] = {
        $each: this._data.data.map(function (document) {
          return document.id;
        })
      };
      return this._model.findByIdAndUpdate(this._params.recordId, {
        $push: updateParams
      }, {
        "new": true
      }).lean().exec();
    }
  }]);
  return HasManyAssociator;
}();
module.exports = HasManyAssociator;