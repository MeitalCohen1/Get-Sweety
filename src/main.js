import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './quasar'
import firebaseInstance from './middleware/firebase'
import VueToastify from "vue-toastify";

Vue.use(VueToastify, {
    position: "center-center",
    withBackdrop: 'true',
    backdrop: "rgba(0, 0, 0, 0.5)",
    defaultTitle: 'false',
    warningInfoDuration: 2500,
    iconEnabled: 'false',
    theme: 'light',
});

Vue.config.productionTip = false

firebaseInstance.firebase.auth().onAuthStateChanged((user) => {
    window.user = user;
    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app')
})

