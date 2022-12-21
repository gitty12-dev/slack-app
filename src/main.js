import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/compat/app'

// firebase config
var firebaseConfig = {
  apiKey: "AIzaSyC-mhQfs1DeEg-1Dx70jaAlSPC7LFFAbB4",
  authDomain: "vue-slack-app-f2f26.firebaseapp.com",
  databaseURL: "https://vue-slack-app-f2f26-default-rtdb.firebaseio.com",
  projectId: "vue-slack-app-f2f26",
  storageBucket: "vue-slack-app-f2f26.appspot.com",
  messagingSenderId: "947044543672",
  appId: "1:947044543672:web:0729b2a36ca5215708584d"
};
firebase.initializeApp(firebaseConfig);
window.firebase = firebase;

createApp(App).use(store).use(router).mount('#app')
