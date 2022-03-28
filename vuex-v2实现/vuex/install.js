export const install = Vue => {
    Vue.mixins({
        beforeCreate() {
            const option = this.$options
            if (option.store) {
                this.$store = option
            } else if (option.parent && option.parent.$store) {
                this.$store = options.parent.$store
            }
        }
    })
}
