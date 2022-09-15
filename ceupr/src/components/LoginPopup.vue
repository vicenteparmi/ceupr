<script setup>
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
</script>

<script>
function updateUI(user) {
  if (user) {
    // Signed in
    const displayName = user.displayName;
    const email = user.email;
    // const emailVerified = user.emailVerified;
    // const photoURL = user.photoURL;
    // const uid = user.uid;

    // Set info
    document.getElementById("login__title").innerHTML = displayName;
    document.getElementById("login__subtitle").innerHTML = email;
  } else {
    // Signed out
    // ...
  }
}

export default {
  name: "LoginPopup",
  props: {
    title: {
      type: String,
      required: true,
      default: "Login",
    },
    subtitle: {
      type: String,
      default: "Entre com suas credenciais para acessar o sistema",
    },
    loginState: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loggedIn: this.loginState,
    };
  },
  methods: {
    show() {
      updateUI(getAuth().currentUser);
    },
    close() {
      this.$emit("close");
    },
    signIn() {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      auth.useDeviceLanguage();

      var user;

      signInWithPopup(auth, provider)
        .then((result) => {
          //const credential = GoogleAuthProvider.credentialFromResult(result);
          //const token = credential.accessToken;
          // The signed-in user info.
          user = result.user;
          this.loggedIn = true;
        })
        .catch((error) => {
          // Handle Errors.
          const errorCode = error.code;
          console.log(errorCode);
          const errorMessage = error.message;
          console.log(errorMessage);
          // The email of the user's account used.
          // const email = error.customData.email;
          // The AuthCredential type that was used.
          // const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        })
        .then(() => {
          console.log(user);
          updateUI(user);
        });
    },
    logOut() {
      const auth = getAuth();
      auth.signOut().then(() => {
        // Sign-out successful.
        this.loggedIn = false;

        // Show alert toast
        this.$emit("alert", {
          type: "success",
          message: "Você saiu do sistema com sucesso!",
        });
      });
    },
  },
};
</script>

<template>
  <div id="loginCard" class="login__background">
    <div class="login__card">
      <div class="login__card__content">
        <h1 id="login__title" class="login__card__title">{{ title }}</h1>
        <p id="login__subtitle" class="login__card__subtitle">
          {{ subtitle }}
        </p>
        <br />
        <div class="login__card__actionbuttons" v-if="!loggedIn">
          <button class="login__card__form__input__button" @click="this.signIn">
            Acessar com o Google
          </button>
          <button
            class="login__card__form__input__button secondary"
            @click="this.close"
          >
            Cancelar
          </button>
        </div>
        <div class="login__card__actionbuttons" v-if="loggedIn">
          <button class="login__card__form__input__button" @click="this.logOut">
            Desconectar
          </button>
          <button
            class="login__card__form__input__button secondary"
            @click="this.close"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login__background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.login__card {
  max-width: 500px;
  padding: 48px;
  background-color: var(--secondary-container);
  border-radius: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login__card__content {
  display: flex;
  flex-direction: column;
}

.login__card__title {
  font-size: 24px;
  font-weight: 500;
  color: var(--on-secondary-container);
}

.login__card__subtitle {
  font-size: 16px;
  color: var(--on-secondary-container);
}

.login__card__actionbuttons {
  display: flex;
  flex-direction: column;
}

.login__card__form__input__button {
  padding: 8px 16px;
  border-radius: 100px;
  border: none;
  outline: none;
  background-color: var(--on-secondary-container);
  color: var(--on-secondary);
  font-size: 16px;
  font-weight: normal;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login__card__form__input__button:hover {
  background-color: var(--on-surface-variant);
}

.secondary {
  background-color: var(--secondary-container);
  color: var(--on-secondary-container);
  margin-top: 8px;
  border: solid 1px var(--on-secondary-container);
}

.secondary:hover {
  opacity: 0.8;
  background-color: var(--secondary-container);
}
</style>
