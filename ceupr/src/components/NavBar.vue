<script setup>
import { getAuth } from "firebase/auth";
import LoginPopup from "./LoginPopup.vue";
</script>

<script>
export default {
  name: "NavBar",
  components: {
    LoginPopup,
  },
  mounted() {
    setTimeout(() => {
      const auth = getAuth();
      auth.onAuthStateChanged((user) => {
        if (user) {
          document.getElementById("account__name").innerHTML = user.displayName;
          document.getElementById("account__email").innerHTML = user.email;
          document.getElementById("account__image").innerHTML =
            "<img src='" +
            user.photoURL +
            "' alt='Imagem de perfil' style='border-radius: 100%; width: 48px; margin-bottom: 8px'>";

          this.userName = user.displayName;
          this.userEmail = user.email;
          this.loggedIn = true;
        } else {
          // User is signed out
          // ...
        }
      });
    });
  },
  data() {
    return {
      show: false,
      userName: "Login",
      userEmail: "Entre com suas credenciais para acessar o sistema",
      loggedIn: false,
      alerts: [],
    };
  },
  methods: {
    close() {
      this.show = false;
    },
    showLogin() {
      this.show = true;
    },
  },
};
</script>

<template>
  <div class="nav-bar">
    <div class="nav-bar__logo">CEU PR</div>
    <div class="nav-bar__links">
      <router-link activeClass="selected" to="/"
        ><span class="material-symbols-rounded icon">home</span>
        Início</router-link
      >
      <router-link to="/colaboradores"
        ><span class="material-symbols-rounded icon">remember_me</span>
        Colaboradores</router-link
      >
    </div>
    <div class="nav-bar__options">
      <div class="account" @click="showLogin()">
        <span
          id="account__image"
          class="material-symbols-rounded icon account__icon"
        >
          account_circle
        </span>
        <span id="account__name" class="account__name">Login</span>
        <span id="account__email" class="account__email">Acessar conta</span>
      </div>
    </div>
    <transition name="fade">
      <LoginPopup
        :title="userName"
        :subtitle="userEmail"
        :loginState="loggedIn"
        ref="loginPopupCard"
        v-if="show"
        @close="show = false"
      />
    </transition>
  </div>
</template>

<style scoped>
.nav-bar {
  display: flex;
  padding: 24px 24px;
  background-color: var(--secondary-container);
  color: var(--on-secondary-container);
  width: fit-content;
  min-width: 225px;
  height: 100vh;
  flex-direction: column;
}
.nav-bar__logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  margin-bottom: 24px;
}

.nav-bar__links {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

.nav-bar__links > a {
  margin-bottom: 8px;
  color: var(--on-secondary-container);
  text-decoration: none;
  padding: 8px 16px;
  width: 100%;
  font-size: 16px;
  border-radius: 24px;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
}

a.router-link-exact-active {
  background-color: var(--on-surface-variant);
  color: var(--on-secondary);
}

.icon {
  margin-right: 8px;
}

.nav-bar__options {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin-top: auto;
}

.account {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
  border: solid 1px var(--outline);
  padding: 8px 16px;
  border-radius: 24px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  transition: 0.2s;
}

.account:hover {
  background-color: var(--on-surface-variant);
  color: var(--on-secondary);
}

.account__icon {
  font-size: xx-large;
  margin: 0;
}

.account__name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 0px;
}

.account__email {
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 0px;
}

.dsaccount__image {
  width: 40px;
  border-radius: 100%;
  margin-bottom: 8px;
}
</style>
