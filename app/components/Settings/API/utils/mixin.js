/* eslint-disable */
// same logic ... but ... 
var mixin = (function (initSymbol) {
  // there is a mechanism to initialize mixins
  function invoke(init) {
    init.call(this);
  }
  // the rest works as explained before, compatible
  // with getters and setters
  return function mixin(behaviour, sharedBehaviour = {}) {
    const instanceKeys = Reflect.ownKeys(behaviour);
    const sharedKeys = Reflect.ownKeys(sharedBehaviour);
    const typeTag = Symbol('isa');

    function _mixin(clazz) {
      for (let property of instanceKeys) {
        // in case the mixin has an init property
        if (property === 'init') {
          // and the prototype hasn't a method already
          if (!clazz.prototype.hasOwnProperty(initSymbol)) {
            // set the prototype array of methods to invoke
            Object.defineProperty(
              clazz.prototype,
              initSymbol,
              // two options ...
              // 1. if the inherited non-own object has initializers
              //    use them too to not miss a single one
              // {value: (clazz.prototype[initSymbol] || Array.prototype).slice(0)}
              //
              // 2. however, you can  use super() for that .. so
              {value: []}
            );
            // and set an initializer shared per each instance
            Object.defineProperty(
              clazz.prototype,
              property,
              {value: function init() {
                // and invoke all of them at once!
                this[initSymbol].forEach(invoke, this);
              }}
            );
          }
          // in every other case just add the initializer
          clazz.prototype[initSymbol].push(behaviour[property]);
        } else {
          // here the regular stuff done before too
          let d = Object.getOwnPropertyDescriptor(behaviour, property);
          d.enumerable = false;
          Object.defineProperty(clazz.prototype, property, d);
        }
      }
      Object.defineProperty(clazz.prototype, typeTag, { value: true });
      return clazz;
    }
    for (let property of sharedKeys) {
      let d = Object.getOwnPropertyDescriptor(behaviour, property);
      d.enumerable = sharedBehaviour.propertyIsEnumerable(property);
      Object.defineProperty(_mixin, property, d);
    }
    Object.defineProperty(_mixin, Symbol.hasInstance, {
      value: (i) => !!i[typeTag]
    });
    return _mixin;
  };
}(Symbol('mixin:init')));

export default mixin;