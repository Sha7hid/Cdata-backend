"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _resourcesRemover = _interopRequireDefault(require("./resources-remover"));
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var ResourceRemover = /*#__PURE__*/function (_ResourcesRemover) {
  (0, _inherits2["default"])(ResourceRemover, _ResourcesRemover);
  var _super = _createSuper(ResourceRemover);
  function ResourceRemover(model, params, user) {
    (0, _classCallCheck2["default"])(this, ResourceRemover);
    return _super.call(this, model, params, [params.recordId], user);
  }
  (0, _createClass2["default"])(ResourceRemover, [{
    key: "perform",
    value: function perform() {
      if (!this._params.recordId) {
        return null;
      }
      return (0, _get2["default"])((0, _getPrototypeOf2["default"])(ResourceRemover.prototype), "perform", this).call(this);
    }
  }]);
  return ResourceRemover;
}(_resourcesRemover["default"]);
module.exports = ResourceRemover;