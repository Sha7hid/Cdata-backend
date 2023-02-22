"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var ProjectionBuilder = /*#__PURE__*/function () {
  function ProjectionBuilder(schema) {
    (0, _classCallCheck2["default"])(this, ProjectionBuilder);
    this.schemaSmartFields = schema && schema.fields && schema.fields.filter(function (field) {
      return field.get;
    }).map(function (field) {
      return field.field;
    });
  }

  // NOTICE: Convert a list of field names into a mongo $project structure.
  (0, _createClass2["default"])(ProjectionBuilder, [{
    key: "findRequestSmartField",
    value:
    // NOTICE: Perform the intersection between schema and request smart fields.
    function findRequestSmartField(requestFieldsNames) {
      if (this.schemaSmartFields && requestFieldsNames) {
        return this.schemaSmartFields.filter(function (fieldName) {
          return requestFieldsNames.includes(fieldName);
        });
      }
      return [];
    }
  }, {
    key: "getProjection",
    value: function getProjection(fieldNames) {
      var requestSmartFields = this.findRequestSmartField(fieldNames);
      if (requestSmartFields.length) return null;
      return ProjectionBuilder.convertToProjection(fieldNames);
    }
  }], [{
    key: "convertToProjection",
    value: function convertToProjection(fieldsNames) {
      if (fieldsNames) {
        var fieldsObject = fieldsNames.reduce(function (fields, fieldName) {
          fields[fieldName] = 1;
          return fields;
        }, {});
        return {
          $project: fieldsObject
        };
      }
      return null;
    }
  }]);
  return ProjectionBuilder;
}();
module.exports = ProjectionBuilder;