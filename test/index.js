function each(a, fn) {
  if (a === null || typeof a === "undefined") return;
  if (typeof a !== "object") return;
  if (Array.isArray(a)) {
    a.forEach((value, key, a) => {
      fn(value, key, a);
    });
  } else {
    for (let key in a) {
      if (Object.prototype.hasOwnProperty.call(a, key)) {
        fn(a[key], key, a);
      }
    }
  }
}
function bind(fn, thisArg) {
  return function () {
    const args = Array.from(arguments);
    return fn.apply(thisArg, args);
  };
}

function extend(a, b, thisArg) {
  each(b, function (value, key) {
    if (typeof value === "function" && thisArg) {
      a[key] = bind(value, thisArg);
    } else {
      a[key] = value;
    }
  });
  return a;
}
let xhr = new XMLHttpRequest();
xhr.open("GET", "https://www.baidu.com", true);
xhr.onreadystatechange = function () {
  console.log(xhr);
};
xhr.send(null);
