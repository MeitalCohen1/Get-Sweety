import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../components/Login.vue'
import firebaseInstance from '../middleware/firebase'

Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {authNotRequired: true}
    },
    {
        path: '/auth',
        name: 'Auth',
        component: () => import(/* webpackChunkName: "about" */ '../views/Auth.vue'),
        meta: {authNotRequired: true}
    },
    {
        path: '/',
        name: 'StartPage',
        component: () => import(/* webpackChunkName: "about" */ '../views/StartPage.vue'),
        meta: {authNotRequired: true}
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "about" */ '../components/Register.vue'),
        meta: {authNotRequired: true}
    },
    {
        path: '/one-card',
        name: 'OneCard',
        component: () => import(/* webpackChunkName: "about" */ '../views/OneCard.vue')
    },
    {
        path: '/ingredients',
        name: 'Ingredients',
        component: () => import(/* webpackChunkName: "about" */ '../components/Ingredients.vue')
    },
    {
        path: '/item/:id',
        name: 'item',
        component: () => import(/* webpackChunkName: "about" */ '../views/Item.vue'),
        meta: {authNotRequired: false}

    },
    {
        path: '/recipes',
        name: 'Recipes',
        component: () => import(/* webpackChunkName: "about" */ '../views/Recipes.vue')
    },
    {
        path: '/profile/:userId',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "about" */ '../views/Profile')
    },
    {
        path: '/back-office',
        name: 'BackOffice',
        component: () => import(/* webpackChunkName: "about" */ '../views/BackOffice')
    },
]

const router = new VueRouter({
    routes
})

// router.beforeEach((to, from, next) => {
//     const user = firebaseInstance.firebase.auth().currentUser
//     if (user && to.meta.authNotRequired || !user && !to.meta.authNotRequired) {
//         const path = !user ? '/' : '/home';
//         return next(path)
//     }
//     next()
// })

export default router
