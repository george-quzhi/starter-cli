var tools = require("name-styles");

var serviceTemplate = function (singularName, pluralName) {
  var singularFileName = tools.hyphen(singularName);
  var pluralFileName = tools.hyphen(pluralName);
  
  var singularVarName = tools.camel(singularName);
  var pluralVarName = tools.camel(pluralName);
  
  var singularClassName = tools.pascal(singularName);
  var pluralClassName = tools.pascal(pluralName);
  return `
import bcrypt from 'bcryptjs';
import DB from '@databases';
import { Create${singularClassName}Dto } from '@dtos/${pluralFileName}.dto';
import HttpException from '@exceptions/HttpException';
import { ${singularClassName} } from '@interfaces/${pluralFileName}.interface';
import { isEmpty } from '@utils/util';

class ${singularClassName}Service {
  public ${pluralVarName} = DB.${pluralClassName};

  public async findAll${singularClassName}(): Promise<${singularClassName}[]> {
    const all${singularClassName}: ${singularClassName}[] = await this.${pluralVarName}.findAll();
    return all${singularClassName};
  }

  public async find${singularClassName}ById(${singularVarName}Id: number): Promise<${singularClassName}> {
    if (isEmpty(${singularVarName}Id)) throw new HttpException(400, "You're not ${singularVarName}Id");

    const find${singularClassName}: ${singularClassName} = await this.${pluralVarName}.findByPk(${singularVarName}Id);
    if (!find${singularClassName}) throw new HttpException(409, "You're not ${singularVarName}");

    return find${singularClassName};
  }

  public async create${singularClassName}(${singularVarName}Data: Create${singularClassName}Dto): Promise<${singularClassName}> {
    if (isEmpty(${singularVarName}Data)) throw new HttpException(400, "You're not ${singularVarName}Data");

    const find${singularClassName}: ${singularClassName} = await this.${pluralVarName}.findOne({ where: { email: ${singularVarName}Data.email } });
    if (find${singularClassName}) throw new HttpException(409, 'You're email'+ ${singularVarName}Data.email + 'already exists');

    const hashedPassword = await bcrypt.hash(${singularVarName}Data.password, 10);
    const create${singularClassName}Data: ${singularClassName} = await this.${pluralVarName}.create({ ...${singularVarName}Data, password: hashedPassword });
    return create${singularClassName}Data;
  }

  public async update${singularClassName}(${singularVarName}Id: number, ${singularVarName}Data: Create${singularClassName}Dto): Promise<${singularClassName}> {
    if (isEmpty(${singularVarName}Data)) throw new HttpException(400, "You're not ${singularVarName}Data");

    const find${singularClassName}: ${singularClassName} = await this.${pluralVarName}.findByPk(${singularVarName}Id);
    if (!find${singularClassName}) throw new HttpException(409, "You're not ${singularVarName}");

    const hashedPassword = await bcrypt.hash(${singularVarName}Data.password, 10);
    await this.${pluralVarName}.update({ ...${singularVarName}Data, password: hashedPassword }, { where: { id: ${singularVarName}Id } });

    const update${singularClassName}: ${singularClassName} = await this.${pluralVarName}.findByPk(${singularVarName}Id);
    return update${singularClassName};
  }

  public async delete${singularClassName}(${singularVarName}Id: number): Promise<${singularClassName}> {
    if (isEmpty(${singularVarName}Id)) throw new HttpException(400, "You're not ${singularVarName}Id");

    const find${singularClassName}: ${singularClassName} = await this.${pluralVarName}.findByPk(${singularVarName}Id);
    if (!find${singularClassName}) throw new HttpException(409, "You're not ${singularVarName}");

    await this.${pluralVarName}.destroy({ where: { id: ${singularVarName}Id } });

    return find${singularClassName};
  }
}

export default ${singularClassName}Service;
`;
};
module.exports = serviceTemplate;