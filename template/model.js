var tools = require("name-styles");

var modelTemplate = function (singularName, pluralName) {  
    var singularFileName = tools.hyphen(singularName);
    var pluralFileName = tools.hyphen(pluralName);
    
    var singularVarName = tools.camel(singularName);
    var pluralVarName = tools.camel(pluralName);
    
    var singularClassName = tools.pascal(singularName);
    var pluralClassName = tools.pascal(pluralName);
  return `
  import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
  import { ${singularClassName} } from '@interfaces/${pluralFileName}.interface';
  
  export type ${singularClassName}CreationAttributes = Optional<${singularClassName}, 'id' | 'parameter'>;
  
  export class ${singularClassName}Model extends Model<${singularClassName}, ${singularClassName}CreationAttributes> implements ${singularClassName} {
    public id: number;
    public parameter: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  export default function (sequelize: Sequelize): typeof ${singularClassName}Model {
    ${singularClassName}Model.init(
      {
        id: {
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        parameter: {
          allowNull: false,
          type: DataTypes.STRING(128),
        },
      },
      {
        tableName: '${pluralVarName}',
        sequelize,
      },
    );
  
    return ${singularClassName}Model;
  }
  
`;
};
module.exports = modelTemplate;