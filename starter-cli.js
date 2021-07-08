#!/usr/bin/env node

var ArgumentParser = require("argparse").ArgumentParser;
var inquirer = require("inquirer");
var fs = require("fs");
var path = require("path");
var starterCli = require("./index.js");

// 命令行参数

var parser = new ArgumentParser({
  version: require("./package.json").version,
  addHelp: true,
  description: "基于typescript-express-starter框架，自动生成项目文件工具",
});

var subparsers = parser.addSubparsers();

// var akitaParser = subparsers.addParser("akita", {
//   description: "生成 akita 使用的 state 和 query 文件",
//   help: "生成 akita 使用的 state 和 query 文件",
//   addHelp: true,
// });

// akitaParser.addArgument(["-n", "--name"], {
//   help: "设置一个模块名，如：userInfo，会自动补全相关文件名和变量名",
//   type: "string",
//   required: true,
// });

// var componentParser = subparsers.addParser("component", {
//   description: "生成 component.ts 文件",
//   help: "生成 component.ts 文件",
//   addHelp: true,
// });

// componentParser.addArgument(["-n", "--name"], {
//   help: "设置一个模块名，如：userInfo，会自动补全相关文件名和变量名",
//   type: "string",
//   required: true,
// });

var controllerParser = subparsers.addParser("controller", {
  description: "生成 controller 文件",
  help: "生成 controller 文件",
  addHelp: true,
});

controllerParser.addArgument(["-s", "--singularName"], {
  help: "设置一个模块名的单数名称，如：user，会自动补全相关文件名和变量名",
  type: "string",
  required: true,
});

controllerParser.addArgument(["-p", "--pluralName"], {
  help: "设置一个模块名的复数名称，如：users，会自动补全相关文件名和变量名",
  type: "string",
  required: true,
});

// var dtoParser = subparsers.addParser("dto", {
//   description: "生成 dto 文件",
//   help: "生成 dto 文件",
//   addHelp: true,
// });

// dtoParser.addArgument(["-n", "--name"], {
//   help: "设置一个模块名，如：userInfo，会自动补全相关文件名和变量名",
//   type: "string",
//   required: true,
// });

// var serviceParser = subparsers.addParser("service", {
//   description: "生成 service 文件",
//   help: "生成 service 文件",
//   addHelp: true,
// });

// serviceParser.addArgument(["-n", "--name"], {
//   help: "设置一个模块名，如：userInfo，会自动补全相关文件名和变量名",
//   type: "string",
//   required: true,
// });

// var dbServiceParser = subparsers.addParser("dbservice", {
//   description: "生成 dbservice 文件",
//   help: "生成 dbservice 文件",
//   addHelp: true,
// });

// dbServiceParser.addArgument(["-n", "--name"], {
//   help: "设置一个模块名，如：userInfo，会自动补全相关文件名和变量名",
//   type: "string",
//   required: true,
// });

// var dbmodelParser = subparsers.addParser("dbmodel", {
//   description: "生成 dbmodel 文件",
//   help: "生成 dbmodel 文件",
//   addHelp: true,
// });

// dbmodelParser.addArgument(["-n", "--name"], {
//   help: "设置一个模块名，如：userInfo，会自动补全相关文件名和变量名",
//   type: "string",
//   required: true,
// });

// var moduleParser = subparsers.addParser("module", {
//   description: "生成 component.ts 和 akita 文件",
//   help: "生成 component.ts 和 akita 文件",
//   addHelp: true,
// });

// moduleParser.addArgument(["-n", "--name"], {
//   help: "设置一个模块名，如：userInfo，会自动补全相关文件名和变量名",
//   type: "string",
//   required: true,
// });

// var dbmodelParser = subparsers.addParser("function", {
//   description: "生成 controller、service、deservvice、dbmodel、dto 文件",
//   help: "生成 dbmodel 文件",
//   addHelp: true,
// });

// dbmodelParser.addArgument(["-n", "--name"], {
//   help: "设置一个模块名，如：userInfo，会自动补全相关文件名和变量名",
//   type: "string",
//   required: true,
// });

var singularName, pluralName;
var args = parser.parseArgs();
var command = process.argv[2];

// 逻辑

if (args.singularName !== null) {
  singularName = args.singularName;
} else {
  inquirer
    .prompt([
      {
        type: "input",
        message: "设置一个模块的单数名:",
        singularName: "singularName",
        require: true,
      },
    ])
    .then((answers) => {
      singularName = answers.singularName;
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else when wrong
      }
    });
}

if (args.pluralName !== null) {
  pluralName = args.pluralName;
} else {
  inquirer
    .prompt([
      {
        type: "input",
        message: "设置一个模块的复数名:",
        pluralName: "pluralName",
        require: true,
      },
    ])
    .then((answers) => {
      pluralName = answers.pluralName;
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else when wrong
      }
    });
}

switch (command) {
  case "route":
  case "controller":
  case "dto":
  case "model":
  case "service":
  case "interface":
  case "test":
    starterCli.generate(command, process.cwd(), singularName, pluralName);
    break;
  case "module":
    starterCli.generate("route", path.join(process.cwd(), "routes"), singularName, pluralName);
    starterCli.generate("controller", path.join(process.cwd(), "controllers"), singularName, pluralName);
    starterCli.generate("dto", path.join(process.cwd(), "dtos"), singularName, pluralName);
    starterCli.generate("model", path.join(process.cwd(), "models"), singularName, pluralName);
    starterCli.generate("interface", path.join(process.cwd(), "interfaces"), singularName, pluralName);
    starterCli.generate("service", path.join(process.cwd(), "services"), singularName, pluralName);
    starterCli.generate("test", path.join(process.cwd(), "tests"), singularName, pluralName);
    break;
  default:
    break;
}
