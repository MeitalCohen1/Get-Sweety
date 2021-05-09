import vue from 'vue'
import Vuex from 'vuex'
import recipes from './recipes'
import users from './users'

vue.use(Vuex)


export default new Vuex.Store( {
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        users,
        recipes
    }
})