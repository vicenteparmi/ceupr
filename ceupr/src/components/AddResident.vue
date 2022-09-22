<script setup>
import { getDatabase, ref, push, set } from "@firebase/database";
</script>

<script>
export default {
  name: "AddResident",
  props: {
    departmentsArray: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      name: "",
      department: "",
      hours: 0,
      exempt: false,
      departments: this.departmentsArray,
    };
  },
  methods: {
    async addResident() {
      const db = getDatabase();
      const residentsRef = ref(db, "residents");
      const newResidentRef = push(residentsRef);
      // Field validation
      if (this.name == "") {
        alert("O nome do morador não pode estar vazio");
        return;
      } else if (this.department == "") {
        alert("Selecione o departamento do morador");
        return;
      } else if (this.hours == "" && this.hours != 0) {
        alert("O número de horas do morador não pode estar vazio");
      }

      set(newResidentRef, {
        name: this.name,
        department: this.department,
        hours: this.hours,
        exempt: this.exempt,
      }).then(() => {
        alert("Morador adicionado com sucesso");
        this.$emit("close");
        this.$emit("update");
      });
    },
    closeAddResident() {
      alert("The add resident window has been closed");
      this.addResidentOpen = false;
    },
  },
};
</script>

<template>
  <div>
    <div id="addResidentCard" class="login__background">
      <div class="addResident__card">
        <div class="addResident__card__content">
          <div class="addResident__card__title">Adicionar morador</div>
          <p style="color: var(--on-secondary-container)">
            Adiciona um novo morador ao quadro de moradores.
          </p>
          <br />
          <div class="addResident__card__input">
            <div class="addResident__card__input__label">Nome completo</div>
            <input
              type="text"
              v-model="name"
              class="addResident__card__input__field"
            />
          </div>
          <div class="addResident__card__input">
            <div class="addResident__card__input__label">Departamento</div>
            <select
              v-model="department"
              class="addResident__card__input__field"
            >
              <option
                v-for="department in departments"
                :key="department.id"
                :value="department.id"
              >
                {{ department.name }}
              </option>
            </select>
          </div>
          <div class="addResident__card__input">
            <div class="addResident__card__input__label">Saldo de horas</div>
            <input
              type="number"
              v-model="hours"
              class="addResident__card__input__field"
            />
          </div>
          <div class="addResident__card__input">
            <div class="addResident__card__input__label">
              É isento de cumprir horas?
            </div>
            <input
              type="checkbox"
              v-model="exempt"
              class="addResident__card__input__field"
            />
          </div>
          <div class="addResident__card__buttons">
            <div class="addResident__card__button" @click="addResident">
              Adicionar morador
            </div>
            <div
              class="addResident__card__button secondary"
              @click="$emit('close')"
            >
              Cancelar
            </div>
          </div>
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
.addResident__card {
  min-width: 500px;
  max-width: 600px;
  height: auto;
  padding: 24px;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--secondary-container);
}

.addResident__card__content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  border-radius: 24px;
  border: solid 1px var(--secondary-container);
}

.addResident__card__title {
  font-size: 24px;
  font-weight: 800;
  color: var(--tertiary);
}

.addResident__card__input {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
}

.addResident__card__input__label {
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  color: var(--on-secondary-container);
  margin-bottom: 4px;
}

.addResident__card__input__field {
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 50px;
  border: solid 1px var(--on-secondary-container);
  background-color: var(--secondary-container);
  color: var(--on-secondary-container);
}

.addResident__card__button {
  padding: 8px 12px;
  border-radius: 100px;
  border: none;
  outline: none;
  background-color: var(--on-secondary-container);
  color: var(--on-secondary);
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  text-align: center;
  margin-top: 12px;
  width: 100%;
}

.addResident__card__button:hover {
  background-color: var(--on-surface-variant);
}

.addResident__card__button:active {
  background-color: var(--primary-active);
}

.addResident__card__button:disabled {
  background-color: var(--primary-disabled);
  color: var(--primary-disabled-text);
  cursor: not-allowed;
}

.addResident__card__button:disabled:hover {
  background-color: var(--primary-disabled);
  color: var(--primary-disabled-text);
  cursor: not-allowed;
}

.addResident__card__button:disabled:active {
  background-color: var(--primary-disabled);
  color: var(--primary-disabled-text);
  cursor: not-allowed;
}

/* Checkbox as toggle */
.addResident__card__input__field[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 40px;
  height: 20px;
  background: var(--on-secondary-container);
  outline: none;
  border-radius: 100px;
  position: relative;
  cursor: pointer;
  padding: 0;
  border: none;
}

.addResident__card__input__field[type="checkbox"]:checked {
  background: var(--primary);
}

.addResident__card__input__field[type="checkbox"]:before {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  top: 0;
  left: 0;
  background: #fff;
  transform: scale(1.1);
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);
  transition: 0.2s;
}

.addResident__card__input__field[type="checkbox"]:checked:before {
  left: 20px;
}

.secondary {
  background-color: var(--secondary-container);
  color: var(--on-secondary-container);
  margin-top: 8px;
  border: solid 1px var(--on-secondary-container);
  margin-right: 8px;
}

.secondary:hover {
  opacity: 0.8;
  background-color: var(--secondary-container);
}

.addResident__card__buttons {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  width: 100%;
}
</style>
