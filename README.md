# promisemonkey

Easily convert objects, functions and METHODs to the Q promise API

# Installation

You can install promisemonkey through npm:
```
$ npm install promisemonkey
```

# Example

## Convert an object

You can pass through a object with methods and then an array of the method
names to promisify:

``` js
var promisify = require('promisemonkey');

// Pass through an object and array of method names
var fs = promisify(require('fs'), ['readFile', 'stat']);

// All the underlying functions should be accessible
var contents = fs.readFileSync(filePath).toString();
expect(contents.length).to.be.above(0);

// You can then use the object methods which are now promisified
fs.stat(filePath)
  .then(function (stats) {
    expect(stats.size).to.be.above(0);
    return fs.readFile(filePath);
  })
  .then(function (contents) {
    expect(contents.length).to.be.above(0);
  })
```

## Convert a function

And, of course you can promisify a plain old function

``` js
var readFile = promisify(require('fs').readFile);
readFile(filePath)
  .then(function (contents) {
    expect(contents.length).to.be.above(0);
  })
```

## Note: ZOMG! promisemonkey uses __proto__!

The "monkey" in "promisemonkey" is because the underlying implementation uses
__proto__ to use prototype chaining to forward method calls through to the
underlying object instance.

The nice thing about this is that it avoids wrapping every single method call
or property, which is quite slow to do in javascript.

It shouldn't cause any issues as __proto__ is now part of the ES6 standard.