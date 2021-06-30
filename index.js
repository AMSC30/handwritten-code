const obj = { name: 'tom' }
const handler = {
  get(t, k, v) {
    console.log(t, k, v)
  },
  set(t, k, v) {
    console.log(t, k, v)
  }
}
const proxy = new Proxy(obj, handler)
proxy.name
