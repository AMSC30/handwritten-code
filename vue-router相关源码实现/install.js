export const _Vue = null
export default function (Vue) {
    // 1.获取到vue构造函数
    _Vue = Vue

    // 2.将生命周期混入到每个vue实例中，选项合并完成后执行该方法，获取到_routerRoot实例,也就是router对象挂载的实例，一般来说是根实例
    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                // router挂载的根实例
                this._routerRoot = this
                this._router = this.$options.router
                this._router.init()
            } else {
                this._routerRoot = this.$parent && this.$parent._routerRoot
            }
        }
    })
}
