var expect      = require('chai').expect;
var browserify  = require('browserify');

var fs          = require('fs');
var path        = require('path');

var lsify       = require('..');

var testDir = 'tests';
var inputFile = 'input.ls';
var expectedFile = 'expected.js';

function testPath(filename) {
  return path.resolve(__dirname, testDir, filename);
}

function makeBundle(lsFile, options, noTransform) {
  var bundle = browserify()
  if (!noTransform) bundle = bundle.transform(lsify, options);
  return bundle.add(testPath(lsFile)).bundle();
}

function matchTest(dir, done, options, noTransform) {
  process.chdir(testPath(dir));
  expected = fs.readFileSync(testPath(dir + '/' + expectedFile), "utf8");

  var stream = makeBundle(dir + '/' + inputFile, options, noTransform);
  output = "";
  stream.on('data', function(chunk) {
    output += chunk;
  });
  stream.on('end', function() {
    expect(output).to.equal(expected);
    done();
  });
}

function errorTest(dir, done, options) {
  process.chdir(testPath(dir));

  var stream = makeBundle(dir + '/' + inputFile, options);
  stream.on('error', function(error) {
    expect(error).to.be.an.instanceOf(Error);
    done();
  });
  stream.on('end', function() {
    throw new Error("Compilation error should have resulted in stream error but did not");
  });
}

describe("lsify", function() {

  it("gives the expected output", function(done) {
    matchTest('output', done);
  });

  it("emits a stream error when LiveScript compilation fails", function(done) {
    errorTest('error', done);
  });

  it("can be configured by passing an object via JavaScript", function(done) {
    matchTest('options', done, { bare: false });
  });

  it("can be configured using package.json", function(done) {
    matchTest('package', done, {}, true);
  });

  it("compiles LS dependencies correctly", function(done) {
    matchTest('depends', done);
  });
});
