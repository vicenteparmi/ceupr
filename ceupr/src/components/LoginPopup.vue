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
    // const uid = user.uid;

    // Set info
    document.getElementById("login__title").innerHTML = displayName;
    document.getElementById("login__subtitle").innerHTML = email;
  } else {
    // Signed out
    document.getElementById("login__title").innerHTML = "Login";
    document.getElementById("login__subtitle").innerHTML =
      "Entre com suas credenciais para acessar o sistema";
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
    image: {
      type: String,
      default: "account_circle",
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
          this.$emit("close");
        });
    },
    logOut() {
      const auth = getAuth();
      auth.signOut().then(() => {
        this.loggedIn = false;
        updateUI(null);
        this.$emit("close");
      });
    },
  },
};
</script>

<template>
  <div id="loginCard" class="login__background">
    <div class="login__card">
      <div class="login__card__content">
        <div class="login__card__header">
          <div id="login__image">
            <span v-if="loginState" class="login__span__img">
              <img
                :src="image"
                alt="Imagem de perfil"
                style="border-radius: 100%; width: 58px"
              />
            </span>
            <span v-else class="login__span__img">
              <i
                class="material-symbols-rounded icon account__icon"
                style="color: var(--on-secondary-container); font-size: 48px"
                >{{ image }}</i
              >
            </span>
          </div>
          <div>
            <h1 id="login__title" class="login__card__title">{{ title }}</h1>
            <p id="login__subtitle" class="login__card__subtitle">
              {{ subtitle }}
            </p>
          </div>
        </div>

        <br />
        <div class="login__card__actionbuttons" v-if="!loggedIn">
          <button class="login__card__form__input__button" @click="signIn">
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
          <button class="login__card__form__input__button" @click="logOut">
            Desconectar
          </button>
          <button
            class="login__card__form__input__button secondary"
            @click="close"
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
  background-color: var(--secondary-container);
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.28);
  user-select: none;
}

.login__card__content {
  display: flex;
  flex-direction: column;
  min-width: 400px;
}

.login__card__header {
  display: flex;
  align-items: center;
  flex-direction: row;
  background-color: var(--on-secondary-container);
  border-radius: 24px 24px 0 0;
  padding: 24px;
  color: var(--secondary-container);
}

.login__card__title {
  font-size: 24px;
  font-weight: 800;
}

.login__card__subtitle {
  font-size: 16px;
}

#login__image {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: var(--secondary-container);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
}

.login__card__actionbuttons {
  display: flex;
  flex-direction: column;
  padding: 0 24px 24px 24px;
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

.login__span__img {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media only screen and (max-width: 600px) {
  .login__card {
    max-width: 90%;
    width: 90%;
  }

  .login__background {
    position: fixed;
  }

  .login__card__header {
    width: 100%;
    max-width: 100%;
  }

  .login__card__content {
    min-width: 100%;
  }
}

</style>
