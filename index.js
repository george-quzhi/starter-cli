var fs = require("fs");
var path = require("path");
var tools = require("name-styles");
var routeTemplate = require("./template/route");
var controllerTemplate = require("./template/controller");
var dtoTemplate = require("./template/dto");
var modelTemplate = require("./template/model");
var serviceTemplate = require("./template/service");
var interfaceTemplate = require("./template/interface");
var testTemplate = require("./template/test");

var starterCli = (function () {
  function formatPath(dirname) {
    dirname = dirname.replace(/\\/g, "/");
    if (dirname.charAt(0) === "/") {
      dirname = dirname.slice(1);
    }
    return dirname;
  }

  function mkdirSync(dirname, callback) {
    const exists = fs.existsSync(dirname);
    if (exists) {
      callback();
    } else {
      mkdirSync(path.dirname(dirname), function () {
        fs.mkdir(dirname, callback);
      });
    }
  }

  function replacePlaceHolder(targetPath, placeHolderMappings) {
    let replaced = false;
    const targetFilePath = formatPath(targetPath);
    if(!fs.existsSync(targetFilePath)) {
      console.log(targetFilePath, 'not exists')
      return replaced;
    }
    let fileString = fs.readFileSync(targetFilePath).toString();
    placeHolderMappings.forEach(mapping => {
      if(fileString.includes(mapping.placeHolder) > -1) {
        fileString = fileString.replace(mapping.placeHolder, `${mapping.replaceText}${mapping.placeHolder}`);
        replaced = true;
      }
    });
    
    if(replaced) {
      fs.writeFileSync(targetFilePath, fileString);
    }
    return replaced;
  }

  return {
    generate: function (command, targetPath, singularName, pluralName) {
      var fileName = tools.hyphen(pluralName);
      try {
        switch (command) {
          case "route": {
            var pagePath = formatPath(path.join(targetPath));
            mkdirSync(pagePath, () => {
              fs.writeFileSync(
                path.join(pagePath, fileName + ".route.ts"),
                routeTemplate(singularName, pluralName)
              );
            });
            const targetFilePath = path.join(targetPath, '../server.ts');
            const pluralClassName = tools.pascal(pluralName);
            const pluralFileName = tools.hyphen(pluralName);
            const placeHolderMappings = [
              {
                placeHolder: '/*RouteImportPlaceHolder*/',
                replaceText: `import ${pluralClassName}Route from '@routes/${pluralFileName}.route';`,
              },
              {
                placeHolder: '/*RoutePlaceHolder*/',
                replaceText: `, new ${pluralClassName}Route()`,
              }
            ];

            if(!replacePlaceHolder(targetFilePath, placeHolderMappings)) {
              console.warn('model代码生成成功，server.ts 文件修改失败，未发现占位符，需要手动添加。详细请使用 starter-cli route -h查看如何修改。')
            }
          }
            break;
          case "controller":
            var controllerPath = formatPath(path.join(targetPath));
            mkdirSync(controllerPath, () => {
              fs.writeFileSync(
                path.join(controllerPath, fileName + ".controller.ts"),
                controllerTemplate(singularName, pluralName)
              );
            });
            break;
          case "dto":
            var dtoPath = formatPath(path.join(targetPath));
            mkdirSync(dtoPath, () => {
              fs.writeFileSync(
                path.join(dtoPath, fileName + ".dto.ts"),
                dtoTemplate(singularName, pluralName)
              );
            });
            break;
          case "model": {
            var modelPath = formatPath(path.join(targetPath));
            mkdirSync(modelPath, () => {
              fs.writeFileSync(
                path.join(modelPath, fileName + ".model.ts"),
                modelTemplate(singularName, pluralName)
              );
            });
            const targetFilePath = path.join(targetPath, '../databases/index.ts');
            const singularClassName = tools.pascal(singularName);
            const pluralClassName = tools.pascal(pluralName);
            const pluralFileName = tools.hyphen(pluralName);
            const placeHolderMappings = [
              {
                placeHolder: '/*ModelImportPlaceHolder*/',
                replaceText: `import ${singularClassName}Model from '@models/${pluralFileName}.model';`,
              },
              {
                placeHolder: '/*ModelPlaceHolder*/',
                replaceText: `${pluralClassName}: ${singularClassName}Model(sequelize),`,
              }
            ];

            if(!replacePlaceHolder(targetFilePath, placeHolderMappings)) {
              console.warn('model代码生成成功，src/databases/index.ts 文件修改失败，未发现占位符，需要手动添加。详细请使用 starter-cli model -h查看如何修改。')
            }
          }
            break;
          case "service":
            var businessServicePath = formatPath(path.join(targetPath));
            mkdirSync(businessServicePath, () => {
              fs.writeFileSync(
                path.join(businessServicePath, fileName + ".service.ts"),
                serviceTemplate(singularName, pluralName)
              );
            });
            break;
          case "interface":
            var businessServicePath = formatPath(path.join(targetPath));
            mkdirSync(businessServicePath, () => {
              fs.writeFileSync(
                path.join(businessServicePath, fileName + ".interface.ts"),
                interfaceTemplate(singularName, pluralName)
              );
            });
            break;
          case "test":
            var businessServicePath = formatPath(path.join(targetPath));
            mkdirSync(businessServicePath, () => {
              fs.writeFileSync(
                path.join(businessServicePath, fileName + ".test.ts"),
                testTemplate(singularName, pluralName)
              );
            });
            break;
          default:
            break;
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  };
})();

module.exports = starterCli;
