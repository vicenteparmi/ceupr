<script setup>
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, set, update } from "firebase/database";
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
          // Truncate email
          const email = user.email;
          let truncatedEmail;
          if (email.length > 20) {
            truncatedEmail = email.substring(0, 20) + "...";
          } else {
            truncatedEmail = email;
          }

          document.getElementById("account__name").innerHTML = user.displayName;
          document.getElementById("account__email").innerHTML = truncatedEmail;

          this.userName = user.displayName;
          this.userEmail = user.email;
          this.userImage = user.photoURL;
          this.loggedIn = true;

          // Check if user is in the database
          const db = getDatabase();
          const userRef = ref(db, "users/" + user.uid);
          get(userRef)
            .then((snapshot) => {
              if (snapshot.exists()) {
                const admRef = ref(db, "users/" + user.uid);

                // Update user data
                update(admRef, {
                  photoURL: user.photoURL,
                });

                // Check if user has the adm role
                get(admRef)
                  .then((snapshot) => {
                    if (snapshot.exists() && snapshot.val().adm) {
                      this.isAdm = true;
                    }
                    // Get user's department
                    this.userDepartment = snapshot.val().department;
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              } else {
                // Add user to database
                const userRef = ref(db, "new_users/" + user.uid);
                set(userRef, {
                  name: user.displayName,
                  email: user.email,
                  photoURL: user.photoURL,
                  department: "",
                  adm: false,
                }).then(() => {
                  console.log("User added to database");
                  alert(
                    "Olá " +
                      user.displayName +
                      "! Seja bem-vindo(a)!\nIremos atualizar a página para enviar seus dados para análise."
                  );
                });
              }
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          // User is signed out
          this.loggedIn = false;
          this.userName = "Login";
          this.userEmail = "Entre com suas credenciais para acessar o sistema";
          this.userImage = "account_circle";
          this.userDepartment = "";
          this.isAdm = false;

          document.getElementById("account__name").innerHTML = "Login";
          document.getElementById("account__email").innerHTML = "Acessar conta";
        }
      });
    }, 1000);
  },
  data() {
    return {
      show: false,
      userName: "Login",
      userEmail: "Entre com suas credenciais para acessar o sistema",
      userImage: "account_circle",
      userDepartment: "",
      loggedIn: false,
      alerts: [],
      isAdm: false,
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
    <div class="nav-bar__logo">
      <svg
        fill="var(--on-secondary-container)"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 345.54 365.9"
      >
        <g id="Camada_2" data-name="Camada 2">
          <g id="Camada_1-2" data-name="Camada 1">
            <path
              class="cls-1"
              d="M.85,218.59,50.5,268.24V247L22.06,218.59,50.5,190.15l6.74-6.74L172.86,67.79l150.81,150.8L234.27,308V217a60.68,60.68,0,0,0-121.36,0v92.49L90.5,287v21.21l22.41,22.41,7.5,7.5,10.33,10.33a59.64,59.64,0,0,0,84.25,0l11.78-11.78,7.5-7.5L344.88,218.59l-172-172ZM219.27,323l-14.89,14.89a44.58,44.58,0,0,1-63,0l-13.44-13.44V217a45.68,45.68,0,0,1,91.36,0Z"
            />
            <polygon
              class="cls-1"
              points="252.27 17.18 252.27 0 94.91 0 94.91 17.18 0 17.18 0 201.76 15 186.76 15 32.18 94.91 32.18 94.91 106.84 109.91 91.84 109.91 17.18 109.91 15 237.27 15 237.27 17.18 237.27 93.3 252.27 108.3 252.27 32.18 330.54 32.18 330.54 186.57 345.54 201.57 345.54 17.18 252.27 17.18"
            />
            <polygon
              class="cls-1"
              points="63 360.48 70.5 360.48 78 360.48 78 180.33 63 195.33 63 360.48"
            />
          </g>
        </g>
      </svg>
      <h1>CEU</h1>
    </div>
    <div class="nav-bar__links">
      <router-link activeClass="selected" to="/"
        ><span class="material-symbols-rounded icon">home</span>
        Início
      </router-link>
      <transition name="fadeup">
        <router-link
          to="/colaboradores"
          v-if="userDepartment != '' && userDepartment != '-1'"
          ><span class="material-symbols-rounded icon">remember_me</span>
          Colaboradores
        </router-link></transition
      ><transition name="fadeup">
        <router-link class="adm" to="/gerenciamento" v-if="isAdm"
          ><span class="material-symbols-rounded icon">settings</span>
          Gerenciamento
        </router-link></transition
      >
      <a @click="showLogin" class="mobile_account">
        <span class="material-symbols-rounded icon">person</span>
        Conta
      </a>
    </div>
    <div class="nav-bar__options">
      <div class="account" @click="showLogin()">
        <span
          id="account__image"
          class="material-symbols-rounded icon account__icon"
          :class="{ admin: isAdm }"
          v-if="!loggedIn"
        >
          account_circle
        </span>
        <img :src="userImage" alt="Imagem de perfil" id="pif" v-if="loggedIn" />
        <span id="account__name" class="account__name">Login</span>
        <span id="account__email" class="account__email">Acessar conta</span>
      </div>
    </div>
    <transition name="fade">
      <LoginPopup
        :title="userName"
        :subtitle="userEmail"
        :image="userImage"
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
  height: 125px;
  margin-bottom: 24px;
  margin-top: 12px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  user-select: none;
}

.nav-bar__logo svg {
  width: 100%;
  height: 100%;
  max-width: 125px;
  max-height: 125px;
}

.nav-bar__links {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

.nav-bar__links > a {
  margin-bottom: 8px;
  color: var(--secondary);
  text-decoration: none;
  padding: 4px 8px;
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

.account__icon.admin::after {
  content: "verified_user";
  font-size: 16px;
  color: var(--on-secondary-container);
  bottom: 4px;
  right: -2px;
  position: absolute;
  background-color: var(--secondary-container);
  padding: 2px;
  border-radius: 50%;
}

.account__name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 0px;
  line-height: normal;
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

#pif {
  border-radius: 100%;
  width: 48px;
  margin-bottom: 8px;
  height: 48px;
}

a.mobile_account {
  display: none;
}

@media only screen and (max-width: 768px) {
  .nav-bar {
    display: flex;
    flex-direction: row;
    padding: 0;
    position: fixed;
    z-index: 10000;
    height: 80px;
    bottom: 0;
    width: 100%;
    max-width: none;
    border-radius: 0px 0px 0 0;
    align-items: center;
    justify-content: center;
  }

  .nav-bar__logo {
    display: none;
  }

  .nav-bar__links {
    flex-direction: row;
    justify-content: space-evenly;
    margin: 0;
    position: absolute;
    width: 100%;
    position: relative;
  }
  .nav-bar__links > a {
    font-size: 12px;
    display: flex;
    flex-direction: column;
    width: auto;
    margin-bottom: 0;
  }

  .nav-bar__options {
    margin-bottom: 8px;
  }

  a.router-link-exact-active {
    background-color: transparent;
    color: var(--on-secondary-container);
    display: flex;
    flex-direction: column;
    align-items: center;
    transition-duration: 0.2s;
  }

  a.router-link-exact-active > .icon {
    color: var(--on-secondary-container);
  }

  a.router-link-exact-active > .icon::after {
    background-color: var(--on-secondary);
    width: 100%;
    height: 100%;
    border-radius: 100px;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    animation: ripple 0.2s cubic-bezier(0.65, 0.05, 0.36, 1);
    z-index: -1;
  }

  /* Background ripple effect */

  @keyframes ripple {
    0% {
      width: 0;
      height: 90%;
      opacity: 0.5;
      left: 50%;
      top: 5%;
    }
    100% {
      width: 100%;
      height: 100%;
      opacity: 1;
      left: 0;
      top: 0;
    }
  }

  .selected {
    background-color: inherit;
    color: var(--on-secondary);
  }

  .icon {
    padding: 4px 8px;
    border-radius: 500px;
    margin: 0;
    margin-bottom: 2px;
    min-width: 64px;
    text-align: center;
    transition-duration: 0.1s;
    font-size: 28px;
  }

  .nav-bar__options {
    width: auto;
    margin: 0;
  }
  .account {
    display: none;
  }

  #pif {
    border-radius: 100%;
    width: 36px;
    height: 36px;
    margin-bottom: 8px;
  }

  #account__email {
    display: none;
  }

  #account__name {
    font-size: 14px;
  }

  .account:hover {
    background-color: transparent;
    color: var(--on-secondary-container);
  }

  a.mobile_account {
    display: flex;
  }
}
</style>
