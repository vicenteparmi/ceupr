<script>
export default {
  name: "ColabCard",
  props: {
    name: {
      type: String,
      required: true,
    },
    hours: {
      type: Number,
      required: true,
    },
    changes: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <div class="colab-card">
    <div class="colab-card__content">
      <div class="status">
        <div
          class="status__indicator"
          :class="{
            ana: status == 'Em análise',
            apr: status == 'Aprovado',
            rec: status == 'Rejeitado',
            nsent: status == 'Não enviado',
          }"
        ></div>
        {{ status }}
      </div>
      <p class="colab-card__name">{{ name }}</p>
      <div class="colab-card__subinfo">
        <p class="colab-card__hours">
          <span class="material-symbols-rounded icon">hourglass_empty</span>
          {{ hours }} horas
        </p>
        <p class="colab-card__changes">
          <span class="material-symbols-rounded icon">track_changes</span>
          {{ changes }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.colab-card {
  display: flex;
  width: auto;
  background-color: var(--surface-variant);
  color: var(--on-surface-variant);
  border-radius: 24px;
  margin-bottom: 12px;
  padding: 24px;
  text-decoration: none;
  transition: 0.2s;
  flex-direction: row;
  margin-right: 12px;
  align-items: center;
  cursor: pointer;
}

.colab-card:hover {
  opacity: 0.8;
  border-radius: 16px;
}

.colab-card__name {
  font-size: 24px;
  font-weight: 500;
  margin: 0;
  padding: 0;
}

.colab-card__hours {
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 0px;
  display: flex;
}

.colab-card__changes {
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 0px;
  display: flex;
  margin-left: 8px;
}

.icon {
  margin-right: 4px;
}

.colab-card__subinfo {
  display: flex;
  flex-direction: row;
}

.colab-card__options {
  display: flex;
  flex-direction: column;
  margin-left: 32px;
  user-select: none;
  cursor: pointer;
}

/* Status options */
.status {
  font-size: 16px;
  font-weight: 600;
  border-radius: 800px;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}

.status__indicator {
  width: 8px;
  height: 8px;
  border-radius: 800px;
  margin-right: 8px;
  animation: pulse 3s infinite;
}
.ana {
  background-color: #f9a825;
}

.apr {
  background-color: #4caf50;
}

.rec {
  background-color: #f44336;
}

.nsent {
  background-color: #bdbdbd;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }
  20% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}

@media screen and (max-width: 600px) {
  .colab-card {
    flex-direction: column;
    margin-right: 0;
    width: 100%;
    align-items: flex-start;
  }
  .colab-card__subinfo {
    margin-top: 12px;
  }
  .colab-card__options {
    margin-left: 0;
    margin-top: 0px;
  }
}
</style>
