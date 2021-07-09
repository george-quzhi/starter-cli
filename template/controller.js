var tools = require("name-styles");

var controllerTemplate = function (singularName, pluralName) {
  var singularFileName = tools.hyphen(singularName);
  var pluralFileName = tools.hyphen(pluralName);
  
  var singularVarName = tools.camel(singularName);
  var pluralVarName = tools.camel(pluralName);
  
  var singularClassName = tools.pascal(singularName);
  var pluralClassName = tools.pascal(pluralName);
  return `
  import { NextFunction, Request, Response } from 'express';
  import { Create${singularClassName}Dto } from '@dtos/${pluralFileName}.dto';
  import { ${singularClassName} } from '@interfaces/${pluralFileName}.interface';
  import ${singularClassName}Service from '@services/${pluralFileName}.service';
  
  class ${pluralClassName}Controller {
    public ${singularVarName}Service = new ${singularClassName}Service();
  
    public get${pluralClassName} = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const findAll${pluralClassName}Data: ${singularClassName}[] = await this.${singularVarName}Service.findAll${pluralClassName}();
  
        res.status(200).json({ data: findAll${pluralClassName}Data, message: 'findAll' });
      } catch (error) {
        next(error);
      }
    };
  
    public get${singularClassName}ById = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const ${singularVarName}Id = Number(req.params.id);
        const findOne${singularClassName}Data: ${singularClassName} = await this.${singularVarName}Service.find${singularClassName}ById(${singularVarName}Id);
  
        res.status(200).json({ data: findOne${singularClassName}Data, message: 'findOne' });
      } catch (error) {
        next(error);
      }
    };
  
    public create${singularClassName} = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const ${singularVarName}Data: Create${singularClassName}Dto = req.body;
        const create${singularClassName}Data: ${singularClassName} = await this.${singularVarName}Service.create${singularClassName}(${singularVarName}Data);
  
        res.status(201).json({ data: create${singularClassName}Data, message: 'created' });
      } catch (error) {
        next(error);
      }
    };
  
    public update${singularClassName} = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const ${singularVarName}Id = Number(req.params.id);
        const ${singularVarName}Data: Create${singularClassName}Dto = req.body;
        const update${singularClassName}Data: ${singularClassName} = await this.${singularVarName}Service.update${singularClassName}(${singularVarName}Id, ${singularVarName}Data);
  
        res.status(200).json({ data: update${singularClassName}Data, message: 'updated' });
      } catch (error) {
        next(error);
      }
    };
  
    public delete${singularClassName} = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const ${singularVarName}Id = Number(req.params.id);
        const delete${singularClassName}Data: ${singularClassName} = await this.${singularVarName}Service.delete${singularClassName}(${singularVarName}Id);
  
        res.status(200).json({ data: delete${singularClassName}Data, message: 'deleted' });
      } catch (error) {
        next(error);
      }
    };
  }
  
  export default ${pluralClassName}Controller;  
`;
};
module.exports = controllerTemplate;