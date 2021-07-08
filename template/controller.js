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
  import ${singularVarName}Service from '@services/${pluralFileName}.service';
  
  class ${pluralClassName}Controller {
    public ${singularVarName}Service = new ${singularVarName}Service();
  
    public get${pluralClassName} = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const findAll${pluralClassName}Data: ${pluralClassName}[] = await this.${singularVarName}Service.findAll${pluralClassName}();
  
        res.status(200).json({ data: findAll${pluralClassName}Data, message: 'findAll' });
      } catch (error) {
        next(error);
      }
    };
  
    public get${pluralClassName}ById = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const ${singularVarName}Id = Number(req.params.id);
        const findOne${pluralClassName}Data: ${pluralClassName} = await this.${singularVarName}Service.find${pluralClassName}ById(${singularVarName}Id);
  
        res.status(200).json({ data: findOne${pluralClassName}Data, message: 'findOne' });
      } catch (error) {
        next(error);
      }
    };
  
    public create${pluralClassName} = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const ${singularVarName}Data: Create${pluralClassName}Dto = req.body;
        const create${pluralClassName}Data: ${pluralClassName} = await this.${singularVarName}Service.create${pluralClassName}(${singularVarName}Data);
  
        res.status(201).json({ data: create${pluralClassName}Data, message: 'created' });
      } catch (error) {
        next(error);
      }
    };
  
    public update${pluralClassName} = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const ${singularVarName}Id = Number(req.params.id);
        const ${singularVarName}Data: Create${pluralClassName}Dto = req.body;
        const update${pluralClassName}Data: ${pluralClassName} = await this.${singularVarName}Service.update${pluralClassName}(${singularVarName}Id, ${singularVarName}Data);
  
        res.status(200).json({ data: update${pluralClassName}Data, message: 'updated' });
      } catch (error) {
        next(error);
      }
    };
  
    public delete${pluralClassName} = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const ${singularVarName}Id = Number(req.params.id);
        const delete${pluralClassName}Data: ${pluralClassName} = await this.${singularVarName}Service.delete${pluralClassName}(${singularVarName}Id);
  
        res.status(200).json({ data: delete${pluralClassName}Data, message: 'deleted' });
      } catch (error) {
        next(error);
      }
    };
  }
  
  export default ${pluralClassName}Controller;  
`;
};
module.exports = controllerTemplate;