var convert = require('q-wrap').convert;

module.exports =
  function promisify(o, fns) {
    if (typeof o === 'object') {
      var p = {};
      p.__proto__ = o;
      fns.forEach(function (fn) {
        p[fn] = convert(o[fn]);
      });

      return p;
    } else if (typeof o == 'function') {
      return convert(o);
    }
  };
