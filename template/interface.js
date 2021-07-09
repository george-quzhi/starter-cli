var tools = require("name-styles");

var interfaceTemplate = function (singularName, pluralName) {
  var singularFileName = tools.hyphen(singularName);
  var pluralFileName = tools.hyphen(pluralName);
  
  var singularVarName = tools.camel(singularName);
  var pluralVarName = tools.camel(pluralName);
  
  var singularClassName = tools.pascal(singularName);
  var pluralClassName = tools.pascal(pluralName);
  return `
  export interface ${singularClassName} {
    id: number;
    parameter: string;
  }
  
`;
};
module.exports = interfaceTemplate;