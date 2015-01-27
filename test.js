var Mocha = require('mocha'),
    fs    = require('fs'),
    path  = require('path');
var specdir = 'test';

var mocha = new Mocha;

fs.readdirSync(specdir).filter(function (file) {
  return file.substr(-3) === '.js';
}).forEach(function (file) {
  mocha.addFile(path.join(specdir, file));
});

mocha.run(function (failures) {
  process.on('exit', function () {
    process.exit(failures);
  });
});
