<script>
export default {
  name: "PubliCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    goToPost() {
      this.$router.push(`/post/${this.id}`);
    },
  },
};
</script>

<template>
  <div class="card" @click="goToPost">
    <h2 class="card__title">{{ title }}</h2>
    <p class="card__date">
      {{ new Date(date).toLocaleDateString() }} às
      {{ new Date(date).toLocaleTimeString() }}
    </p>
    <p class="card__subtitle">{{ subtitle }}</p>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  width: 100%;
  background-color: var(--secondary-container);
  color: var(--on-secondary-container);
  border-radius: 24px;
  padding: 24px;
  text-decoration: none;
  transition: 0.2s;
  flex-direction: column;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.card:hover {
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
}

.card__title {
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 0px;
  line-height: 1.25;
}

.card__subtitle {
  font-size: 16px;
  font-weight: 400;
  margin-top: 8px;
}

.card__date {
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 8px;
}
</style>
