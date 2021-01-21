function curry(fn) {
  const argLength = fn.length;
  let argList = [];
  return function () {
    argList = argList.concat([...arguments]);

    if (argLength === argList.length) {
      return fn.apply(this, argList);
    } else {
      return arguments.callee;
    }
  };
}
function add(a, b, c) {
  return a + b + c;
}
const curriedFn = curry(add);
console.log(curriedFn(1)(2, 3));
