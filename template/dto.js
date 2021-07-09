var tools = require("name-styles");

var dtoTemplate = function (singularName, pluralName) {  
  var singularClassName = tools.pascal(singularName);
  return `

import { IsString } from 'class-validator';

export class Create${singularClassName}Dto {
  @IsString()
  public parameter: string;
}
`;
};
module.exports = dtoTemplate;