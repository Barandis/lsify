/*
 * Tests here use include/contain rather than equal because we're not
 * terribly interested in the stuff that browserify adds for packaging purposes
 */

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

function makeBundle(lsFile, options) {
  var bundle = browserify().transform(lsify, options);
  return bundle.add(testPath(lsFile)).bundle();
}

function matchTest(dir, done, options) {
  process.chdir(testPath(dir));
  expected = fs.readFileSync(testPath(dir + '/' + expectedFile), "utf8");

  var stream = makeBundle(dir + '/' + inputFile, options);
  output = "";
  stream.on('data', function(chunk) {
    output += chunk;
  });
  stream.on('end', function() {
    expect(output).to.include(expected);
    done();
  });
}

describe("lsify", function() {
  it("gives the expected output", function(done) {
    matchTest('output', done);
  });
});
