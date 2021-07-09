var tools = require("name-styles");

var testTemplate = function (singularName, pluralName) {  
    var singularFileName = tools.hyphen(singularName);
    var pluralFileName = tools.hyphen(pluralName);
    
    var singularVarName = tools.camel(singularName);
    var pluralVarName = tools.camel(pluralName);
    
    var singularClassName = tools.pascal(singularName);
    var pluralClassName = tools.pascal(pluralName);
  return `
  import { Sequelize } from 'sequelize';
  import request from 'supertest';
  import App from '@/app';
  import { Create${singularClassName}Dto } from '@dtos/${pluralFileName}.dto';
  import ${singularClassName}Route from '@routes/${pluralFileName}.route';
  
  afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
  });
  
  describe('Testing ${pluralClassName}', () => {
    
  });
  
`;
};
module.exports = testTemplate;