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

var singularOptions = ["-s", "--singularName"];
var singularHelp = {
  help: "设置一个模块名的单数名称，如：user，会自动补全相关文件名和变量名",
  type: "string",
  required: true,
};
var pluralOptions = ["-p", "--pluralName"];
var pluralHelp = {
  help: "设置一个模块名的复数名称，如：users，会自动补全相关文件名和变量名",
  type: "string",
  required: true,
};

var routeParser = subparsers.addParser("route", {
  description: "生成 route 文件",
  help: "生成 route 文件",
  addHelp: true,
});

var controllerParser = subparsers.addParser("controller", {
  description: "生成 controller 文件",
  help: "生成 controller 文件",
  addHelp: true,
});

var dtoParser = subparsers.addParser("dto", {
  description: "生成 dto 文件",
  help: "生成 dto 文件",
  addHelp: true,
});

var modelParser = subparsers.addParser("model", {
  description: "生成 model 文件",
  help: "生成 model 文件",
  addHelp: true,
});

var serviceParser = subparsers.addParser("service", {
  description: "生成 service 文件",
  help: "生成 service 文件",
  addHelp: true,
});

var interfaceParser = subparsers.addParser("interface", {
  description: "生成 interface 文件",
  help: "生成 interface 文件",
  addHelp: true,
});

var testParser = subparsers.addParser("test", {
  description: "生成 test 文件",
  help: "生成 test 文件",
  addHelp: true,
});


routeParser.addArgument(singularOptions, singularHelp);
routeParser.addArgument(pluralOptions, pluralHelp);
controllerParser.addArgument(singularOptions, singularHelp);
controllerParser.addArgument(pluralOptions, pluralHelp);
dtoParser.addArgument(singularOptions, singularHelp);
dtoParser.addArgument(pluralOptions, pluralHelp);

modelParser.addArgument(singularOptions, singularHelp);
modelParser.addArgument(pluralOptions, pluralHelp);

serviceParser.addArgument(singularOptions, singularHelp);
serviceParser.addArgument(pluralOptions, pluralHelp);

interfaceParser.addArgument(singularOptions, singularHelp);
interfaceParser.addArgument(pluralOptions, pluralHelp);

testParser.addArgument(singularOptions, singularHelp);
testParser.addArgument(pluralOptions, pluralHelp);



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
