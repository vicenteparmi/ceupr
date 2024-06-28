<template>
  <div>
    <div class="modal-overlay" @click="closeModal"></div>
    <div class="modal-dialog">
      <div class="modal-header">
        <h3>{{ title }}</h3>
      </div>
      <div class="modal-body">
        <p>{{ content }}</p>
      </div>
      <!-- Button bar -->
      <div class="modal-footer">
        <button @click="closeModal">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isVisible: false,
    };
  },
  mounted() {
    this.showModal();
  },
  methods: {
    showModal() {
      this.isVisible = true;
      requestAnimationFrame(() => {
        this.$el.classList.add("modal-visible");
      });
    },
    closeModal() {
      this.isVisible = false;
      requestAnimationFrame(() => {
        this.$el.classList.remove("modal-visible");
      });
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-dialog,
.modal-overlay {
  opacity: 0;
  transition: opacity 0.3s, transform 0.3s;
}

.modal-visible .modal-dialog,
.modal-visible .modal-overlay {
  opacity: 1;
}

.modal-dialog {
  background-color: var(--surface);
  border-radius: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 24px;
  width: 400px;
  max-width: 90%;
  margin: 0 auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.modal-header h3 {
  margin: 0;
  font-size: 24px;
  font-weight: 500;
}

.modal-body p {
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.modal-footer button {
  background-color: transparent;
  color: var(--on-primary-container);
  border: none;
  border-radius: 24px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.2s;
}

.modal-footer button:hover {
  background-color: var(--primary-container);
  color: var(--on-primary-container);
}
</style>
