Function.prototype.myCall = function (context) {
    if (
        !context ||
        Object.prototype.toString.call(context) !== '[object Object]'
    ) {
        context = window
    }
    const args = arguments.length > 1 ? [...arguments].slice(1) : []
    context.fn = this
    const result = context.fn(...args)
    delete context.fn
    return result
}
function test(age) {
    console.log(this.name + ':' + age)
}
const obj = {
    name: 'tom'
}

test.myCall(obj, 12)
