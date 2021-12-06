var port = Number(process.env.PORT || 5000);
var express = require("express"),
  moment = require("moment");

var exports = (module.exports = function (dir, options) {
  var modules = {};
  options = merge(options || {}, {
    lazy: true,
  });

  fs.readdirSync(dir).forEach(function (filename) {
    // filter index and dotfiles
    if (filename !== "index.js" && filename[0] !== ".") {
      var moduleName = path.basename(filename, path.extname(filename));
      var modulePath = path.join(dir, moduleName);
      // lazy load
      if (options.lazy) {
        Object.defineProperty(modules, moduleName, {
          get: function () {
            return require(modulePath);
          },
        });
      } else {
        modules[moduleName] = require(modulePath);
      }
    }
  });

  return modules;
});
