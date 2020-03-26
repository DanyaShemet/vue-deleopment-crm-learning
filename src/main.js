import Vue from "vue";
import App from "./App.vue";
import Vuelidate from "vuelidate";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueMeta from 'vue-meta'
import 'materialize-css/dist/js/materialize';
import dateFilter from "./filters/date.filter";
import currencyFilter from "./filters/currency.filter";
import localizeFilter from "./filters/localize.filter";
import messagePlugin from "./utils/message.plugin";
import titlePlugin from './utils/title.plugin'
import Paginate from 'vuejs-paginate'

import Loader from "./components/app/Loader";

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

import toolTip from './directives/tooltip.directive'

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.use(titlePlugin);
Vue.use(VueMeta)
Vue.component("Loader", Loader);
Vue.component('Paginate', Paginate)
Vue.filter('date', dateFilter)
Vue.filter('currencyFilter', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('toolTip', toolTip)

firebase.initializeApp({
    apiKey: "AIzaSyB7oamMpAspffQqPMEfDriGcL6M_nTXIAY",
    authDomain: "vue-development-crm.firebaseapp.com",
    databaseURL: "https://vue-development-crm.firebaseio.com",
    projectId: "vue-development-crm",
    storageBucket: "vue-development-crm.appspot.com",
    messagingSenderId: "67225917473",
    appId: "1:67225917473:web:b17bbc0d2c9c1d151d6b60"
});

let app;

firebase.auth().onAuthStateChanged(()=> {
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount("#app");
  }
});


