import { createApp } from "vue";
import { createPinia } from "pinia";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

// Firebase

const firebaseConfig = {
  apiKey: "AIzaSyBDzm3Y-zUlI8h9V6lSDU7UO9f4KalmhdY",
  authDomain: "site-ceu-pr.firebaseapp.com",
  projectId: "site-ceu-pr",
  storageBucket: "site-ceu-pr.appspot.com",
  messagingSenderId: "989770794428",
  appId: "1:989770794428:web:cbec70293be54b73fad7b9",
  measurementId: "G-RPDYRZ84WT",
};

// Initialize Firebase
const fb = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(fb);

// App

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
