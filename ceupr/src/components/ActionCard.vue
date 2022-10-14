<script>
export default {
  name: "ActionCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <router-link :to="link" class="action-card">
    <div class="action-card__icon">
      <span class="material-symbols-rounded icon">{{ icon }}</span>
    </div>
    <div class="action-card__content">
      <h1 class="action-card__title">{{ title }}</h1>
      <p class="action-card__subtitle">{{ subtitle }}</p>
    </div>
  </router-link>
</template>

<style scoped>
.action-card {
  display: flex;
  width: 100%;
  background-color: var(--surface-variant);
  color: var(--on-surface-variant);
  border-radius: 36px;
  padding: 36px;
  text-decoration: none;
  transition: 0.2s;
  flex-direction: column;
}

.action-card:hover {
  opacity: 0.8;
  border-radius: 24px;
}

.action-card__icon {
  display: flex;
  margin-bottom: 12px;
}

.action-card__content {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
}

.action-card__title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 0px;
}

.action-card__subtitle {
  font-size: 16px;
  font-weight: 400;
}

.icon {
  font-size: 36px;
}

@media only screen and (max-width: 600px) {
  .action-card {
    width: 100%;
    border-radius: 24px;
    padding: 24px;
  }

  .action-card:active {
    border-radius: 12px;
  }
}

</style>
