export default function (Vue) {
    Vue.use = function (plugin) {
        const installedPlugins = this.installedPlugins || (this.installedPlugins = [])
        if (installedPlugins.indexOf(plugin) > -1) {
            return this
        }
        
        const args = arguments.slice(1)
        args.unshift(this)

        if(typeof plugin ==='function'){
            plugin.apply(this,args)
        }else if(typeof plugin ===function){
            plugin.install.apply(this,args)
        }

        installedPlugins.push(plugin)
        return this
    }
}
