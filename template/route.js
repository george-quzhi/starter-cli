var tools = require("name-styles");

var routeTemplate = function (singularName, pluralName) {
  var singularFileName = tools.hyphen(singularName);
  var pluralFileName = tools.hyphen(pluralName);
  
  var singularVarName = tools.camel(singularName);
  var pluralVarName = tools.camel(pluralName);
  
  var singularClassName = tools.pascal(singularName);
  var pluralClassName = tools.pascal(pluralName);
  return `
  import { Router } from 'express';
  import ${pluralClassName}Controller from '@controllers/${pluralFileName}.controller';
  import { Create${singularClassName}Dto } from '@dtos/${pluralFileName}.dto';
  import Routes from '@interfaces/routes.interface';
  import validationMiddleware from '@middlewares/validation.middleware';
  
  class ${pluralClassName}Route implements Routes {
    public path = '/${pluralFileName}';
    public router = Router();
    public ${pluralVarName}Controller = new ${pluralClassName}Controller();
  
    constructor() {
      this.initializeRoutes();
    }
  
    private initializeRoutes() {
      this.router.get(this.path, this.${pluralVarName}Controller.get${pluralClassName});
      this.router.get(this.path + '/:id(\\d+)', this.${pluralVarName}Controller.get${singularClassName}ById);
      this.router.post(this.path, validationMiddleware(Create${singularClassName}Dto, 'body'), this.${pluralVarName}Controller.create${singularClassName});
      this.router.put(this.path + '/:id(\\d+)', validationMiddleware(Create${singularClassName}Dto, 'body', true), this.${pluralVarName}Controller.update${singularClassName});
      this.router.delete(this.path +'/:id(\\d+)', this.${pluralVarName}Controller.delete${singularClassName});
    }
  }
  
  export default ${pluralClassName}Route;
`;
};
module.exports = routeTemplate;