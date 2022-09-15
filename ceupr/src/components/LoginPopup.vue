<script setup></script>

<script>
export default {
  name: "LoginPopup",
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<template>
  <div id="loginCard" class="login__background">
    <div class="login__card">
      <div class="login__card__content">
        <h1 class="login__card__title">Login</h1>
        <p class="login__card__subtitle">
          Entre com suas credenciais para acessar o sistema.
        </p>
        <br />
        <button class="login__card__form__input__button">
          Acessar com o Google
        </button>
        <button
          class="login__card__form__input__button secondary"
          @click="this.close"
        >
          Cancelar
        </button>
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
