var deps = deps || {};

deps.fs = require('fs');
deps.path = require('path');
deps.express = require('express')();
deps.http = require('http').Server(deps.express);
deps.color = require('colors');

deps.color.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

module.exports = deps;