var fs = require("fs");
var path = require("path");
var tools = require("name-styles");
var controllerTemplate = require("./template/controller");

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

  return {
    generate: function (command, targetPath, singularName, pluralName) {
      try {
        switch (command) {
          case "route":
            var pagePath = formatPath(path.join(targetPath));
            mkdirSync(pagePath, () => {
              fs.writeFileSync(
                path.join(pagePath, fileName + ".component.ts"),
                componentTemplate(className, fileName, varName)
              );
            });
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
                path.join(dtoPath, fileName + ".request-dto.ts"),
                dtoTemplate(className, fileName, varName)
              );
            });
            break;
          case "model":
            var modelPath = formatPath(path.join(targetPath));
            mkdirSync(modelPath, () => {
              fs.writeFileSync(
                path.join(modelPath, fileName + ".model.ts"),
                dbModelTemplate(className, fileName, varName)
              );
            });
            break;
          case "service":
            var businessServicePath = formatPath(path.join(targetPath));
            mkdirSync(businessServicePath, () => {
              fs.writeFileSync(
                path.join(businessServicePath, fileName + ".service.ts"),
                businessServiceTemplate(className, fileName, varName)
              );
            });
            break;

          case "interface":
            var businessServicePath = formatPath(path.join(targetPath));
            mkdirSync(businessServicePath, () => {
              fs.writeFileSync(
                path.join(businessServicePath, fileName + ".service.ts"),
                businessServiceTemplate(className, fileName, varName)
              );
            });
            break;
          case "test":
            var businessServicePath = formatPath(path.join(targetPath));
            mkdirSync(businessServicePath, () => {
              fs.writeFileSync(
                path.join(businessServicePath, fileName + ".service.ts"),
                businessServiceTemplate(className, fileName, varName)
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
