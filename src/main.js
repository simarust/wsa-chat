import Vue from 'vue'
import App from './App.vue'

import './styles/quasar.styl'
import iconSet from 'quasar-framework/icons/mdi'
import 'quasar-extras/roboto-font'
import 'quasar-extras/mdi'
import Quasar from 'quasar'

import firebase from 'firebase/app'
import 'firebase/auth'

import VueFire from 'vuefire'
Vue.use(VueFire)

var config = {
  apiKey: "-----------------SECRET! ;)-------------------",
  authDomain: "wsa-chat.firebaseapp.com",
  databaseURL: "https://wsa-chat.firebaseio.com",
  projectId: "wsa-chat",
  storageBucket: "",
  messagingSenderId: "657200627656"
};

firebase.initializeApp(config);

Vue.use(Quasar, {
  config: {}, iconSet: iconSet
 })

Vue.config.productionTip = false

let app = undefined

firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      render: h => h(App),
      data: {
        user
      }
    }).$mount('#app')
  } else {
    app.user = user
  }
})

