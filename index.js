var fs = require("fs");
var path = require("path");
var tools = require("name-styles");
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

  return {
    generate: function (command, targetPath, singularName, pluralName) {
      var fileName = tools.hyphen(pluralName);
      try {
        switch (command) {
          case "route":
            var pagePath = formatPath(path.join(targetPath));
            mkdirSync(pagePath, () => {
              fs.writeFileSync(
                path.join(pagePath, fileName + ".route.ts"),
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
                path.join(dtoPath, fileName + ".dto.ts"),
                dtoTemplate(singularName, pluralName)
              );
            });
            break;
          case "model":
            var modelPath = formatPath(path.join(targetPath));
            mkdirSync(modelPath, () => {
              fs.writeFileSync(
                path.join(modelPath, fileName + ".model.ts"),
                modelTemplate(singularName, pluralName)
              );
            });
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
