<script setup>
import {
  getDatabase,
  ref,
  get,
  push,
  remove,
  set,
  update,
} from "firebase/database";
</script>

<script>
export default {
  name: "DepartmentManageView",
  mounted() {
    this.getDirectors();
    this.getDepartments();
  },
  data() {
    return {
      departments: [],
      directors: [],
      showDialog: false,
      showEditDialogState: false,
      newDep: {
        name: "",
        description: "",
        director: "",
      },
      editDep: {
        name: "",
        description: "",
        director: "",
        id: "",
        allowDelete: true,
        disabled: false,
      },
    };
  },
  methods: {
    async getDirectors() {
      const db = getDatabase();
      const directorsRef = ref(db, "users");
      const snapshot = await get(directorsRef);
      if (snapshot.exists()) {
        snapshot.forEach((user) => {
          this.directors.push({
            id: user.key,
            name: user.val().name,
            email: user.val().email,
          });
        });
      } else {
        console.log("No data available");
      }
    },
    async getDepartments() {
      const db = getDatabase();
      const departmentRef = ref(db, "departments");
      get(departmentRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
              const childKey = childSnapshot.key;
              const childData = childSnapshot.val();
              this.departments.push({
                id: childKey,
                name: childData.name,
                director: childData.director ? childData.director : "",
                description: childData.description,
                allowDelete:
                  childData.allowDelete == undefined
                    ? true
                    : childData.allowDelete,
                disabled:
                  childData.disabled == undefined ? false : childData.disabled,
              });
            });
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    createDepartment() {
      const db = getDatabase();
      const departmentRef = ref(db, "departments");
      push(departmentRef, {
        name: this.newDep.name,
        description: this.newDep.description,
        director: this.newDep.director,
      })
        .then(() => {
          console.log("Data saved successfully!");

          // Set director department
          const userRef = ref(db, "users/" + this.newDep.director);
          set(userRef, {
            department: this.newDep.id,
          });
        })
        .catch((error) => {
          console.error("Failed to save data: ", error);
        });

      this.showDialog = false;
      // Clear screen
      this.newDep.name = "";
      this.newDep.description = "";
      this.newDep.director = "";

      // Refresh departments
      this.departments = [];
      this.getDepartments();
    },
    removeDepartment(id) {
      const db = getDatabase();
      const departmentRef = ref(db, "departments/" + id);
      if (confirm("Tem certeza que deseja remover este departamento?")) {
        remove(departmentRef).then(() => {
          console.log("Data removed successfully!");
          this.departments = [];
          this.getDepartments();
        });
      }
    },
    showEditDialog(id) {
      this.showEditDialogState = true;
      this.departments.forEach((department) => {
        if (department.id == id) {
          this.editDep.name = department.name;
          this.editDep.description = department.description;
          this.editDep.director = department.director;
          this.editDep.id = id;
          this.editDep.disabled = department.disabled;
        }
      });
    },
    saveEditDepartment(id) {
      const db = getDatabase();
      const departmentRef = ref(db, "departments/" + id);
      console.log(this.editDep);
      update(departmentRef, {
        name: this.editDep.name,
        description: this.editDep.description,
        director: this.editDep.director,
        disabled: this.editDep.disabled,
      })
        .then(() => {
          console.log("Data saved successfully!");
          // Set director department
          const userRef = ref(db, "users/" + this.editDep.director);
          update(userRef, {
            department: this.editDep.id,
          });

          // Refresh departments
          this.departments = [];
          this.getDepartments();
        })
        .catch((error) => {
          console.error("Failed to save data: ", error);
        });

      this.showEditDialogState = false;
    },
  },
};
</script>

<template>
  <div>
    <h2 class="title" style="color: var(--tertiary)">
      <span class="material-symbols-rounded icon" v-on:click="$router.go(-1)"
        >arrow_back_ios_new</span
      >Departamentos
    </h2>
    <div class="departments__add_button" v-on:click="showDialog = true">
      <span class="material-symbols-rounded icon">add</span>
      Criar departamento
    </div>
    <div class="departments__list">
      <div
        v-for="department in departments"
        :key="department.id"
        class="departments__list__item"
        :class="{ disabled: department.disabled }"
      >
        <div class="departments__list__item__name">
          {{ department.name }}
        </div>
        <div class="departments__list__item__description">
          {{
            department.description.length > 100
              ? department.description.substring(0, 100) + "..."
              : department.description
          }}
        </div>
        <div
          class="departments__list__item__actions"
          :class="{ hidden: !department.allowDelete }"
        >
          <span
            class="material-symbols-rounded icon"
            v-on:click="showEditDialog(department.id)"
            >edit</span
          >
          <span
            class="material-symbols-rounded icon"
            v-on:click="removeDepartment(department.id)"
            >delete</span
          >
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="departments__create__new__dialog__bg" v-if="showDialog">
        <div class="departments__create__new__dialog">
          <div class="departments__create__new__dialog__title">
            Criar novo departamento
          </div>
          <div class="departments__create__new__dialog__content">
            <div class="departments__create__new__dialog__content__input">
              <label for="name">Nome do departamento</label>
              <input type="text" id="name" v-model="newDep.name" />
            </div>
            <div class="departments__create__new__dialog__content__input">
              <label for="description">Descrição</label>
              <textarea
                id="description"
                v-model="newDep.description"
              ></textarea>
            </div>
            <div class="departments__create__new__dialog__content__input">
              <label for="director">Diretor</label>
              <select name="director" id="director" v-model="newDep.director">
                <option value="null">Nenhum</option>
                <option
                  v-for="director in directors"
                  :key="director.id"
                  :value="director.name"
                  :select="director.id == newDep.director"
                >
                  {{ director.name }} ({{ director.email }})
                </option>
              </select>
            </div>
          </div>
          <div class="departments__create__new__dialog__actions">
            <button
              class="button departments__create__new__dialog__actions__cancel"
              v-on:click="showDialog = false"
            >
              Cancelar
            </button>
            <button
              class="button departments__create__new__dialog__actions__create"
              v-on:click="createDepartment"
            >
              Criar
            </button>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div
        class="departments__create__new__dialog__bg"
        v-if="showEditDialogState"
      >
        <div class="departments__create__new__dialog">
          <div class="departments__create__new__dialog__title">
            Editar departamento
          </div>
          <div class="departments__create__new__dialog__content">
            <div class="departments__create__new__dialog__content__input">
              <label for="name">Nome do departamento</label>
              <input type="text" id="name" v-model="editDep.name" />
            </div>
            <div class="departments__create__new__dialog__content__input">
              <label for="description">Descrição</label>
              <textarea
                id="description"
                v-model="editDep.description"
              ></textarea>
            </div>
            <div class="departments__create__new__dialog__content__input">
              <label for="director">Diretor</label>
              <select name="director" id="director" v-model="editDep.director">
                <option value="null">Nenhum</option>
                <option
                  :value="director.id"
                  v-for="director in directors"
                  :key="director.id"
                >
                  {{ director.name }} ( {{ director.email }} )
                </option>
              </select>
            </div>
            <!-- Disabled -->
            <div class="departments__create__new__dialog__content__input">
              <label for="disabled">Desativar departamento</label>
              <input
                type="checkbox"
                id="disabled"
                v-model="editDep.disabled"
                class="switch"
              />
            </div>
          </div>
          <div class="departments__create__new__dialog__actions">
            <button
              class="button departments__create__new__dialog__actions__cancel"
              v-on:click="showEditDialogState = false"
            >
              Cancelar
            </button>
            <button
              class="button departments__create__new__dialog__actions__create"
              v-on:click="saveEditDepartment(editDep.id)"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.departments__add_button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 48px;
  margin-top: 12px;
  background-color: var(--primary-container);
  border-radius: 16px;
  color: var(--on-primary-container);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  padding: 0 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  transition-duration: 100ms;
  user-select: none;
}

.departments__add_button:hover {
  background-color: var(--on-primary);
  color: var(--primary);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
}

.departments__add_button:active {
  background-color: var(--on-primary);
  color: var(--primary);
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
}

.departments__add_button .material-symbols-rounded {
  margin-right: 8px;
}

/* Department list cards */

.departments__list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: left;
  margin-top: 24px;
}

.departments__list__item {
  display: flex;
  flex-direction: column;
  width: 46%;
  height: 180px;
  background-color: var(--surface-variant);
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  transition-duration: 200ms;
  user-select: none;
  margin-bottom: 24px;
  margin-right: 24px;
}

.departments__list__item:hover {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
}

.departments__list__item:active {
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
}

.departments__list__item__name {
  font-size: 24px;
  font-weight: 600;
  color: var(--on-surface-variant);
  margin-bottom: 8px;
  line-height: normal;
}

.departments__list__item__description {
  font-size: 16px;
  color: var(--on-surface-variant);
  margin-bottom: 8px;
}

.departments__list__item__actions {
  display: flex;
  position: absolute;
  bottom: 24px;
  right: 24px;
  background-color: var(--secondary-container);
  border-radius: 16px;
  padding: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  transition-duration: 200ms;
  user-select: none;
  color: var(--on-secondary-container);
}

.departments__list__item__actions .material-symbols-rounded {
  margin: 0 8px;
  cursor: pointer;
  transition-duration: 100ms;
  color: var(--on-surface-variant);
}

.departments__list__item__actions .material-symbols-rounded:hover {
  transform: scale(1.2);
}

.departments__list__item__actions .material-symbols-rounded:active {
  transform: scale(0.8);
}

/* Create new department dialog */

.departments__create__new__dialog__bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.departments__create__new__dialog {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  height: auto;
  background-color: var(--surface-variant);
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  transition-duration: 200ms;
  user-select: none;
  margin-bottom: 24px;
  margin-right: 24px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.departments__create__new__dialog__title {
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
  color: var(--on-surface-variant);
  margin-bottom: 8px;
  line-height: normal;
}

.departments__create__new__dialog__title .material-symbols-rounded {
  margin-right: 8px;
}

.departments__create__new__dialog__content {
  display: block;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 16px;
}

.departments__create__new__dialog__content__input {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

.departments__create__new__dialog__content__input label {
  font-size: 16px;
  font-weight: 600;
  color: var(--on-surface-variant);
  margin-bottom: 8px;
}

.departments__create__new__dialog__content__input input {
  color: var(--on-surface-variant);
  font-size: 16px;
  font-weight: 600;
  padding: 0 16px;
  transition-duration: 100ms;
  user-select: none;
}

.departments__create__new__dialog__content__input input[type="text"] {
  width: 100%;
  height: 48px;
  background-color: var(--surface-variant);
}

.departments__create__new__dialog__content__input textarea {
  width: 100%;
  height: 100%;
  background-color: var(--surface-variant);
  border-radius: 8px;
  color: var(--on-surface-variant);
  font-size: 16px;
  font-weight: 600;
  padding: 16px;
  transition-duration: 100ms;
  user-select: none;
  font-family: inherit;
}

.departments__create__new__dialog__content__actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-top: auto;
}

.departments__create__new__dialog__content__actions .material-symbols-rounded {
  margin-left: 8px;
  cursor: pointer;
  transition-duration: 100ms;
  color: var(--on-surface-variant);
}

.departments__create__new__dialog__content__actions
  .material-symbols-rounded:hover {
  transform: scale(1.2);
}

.departments__create__new__dialog__content__actions
  .material-symbols-rounded:active {
  transform: scale(0.8);
}

.hidden {
  display: none;
}

.disabled {
  opacity: 0.5;
}

@media only screen and (max-width: 600px) {
  .departments__list {
    flex-direction: column;
  }

  .departments__list__item {
    width: 100%;
    margin-right: 0;
  }

  .departments__create__new__dialog {
    width: 90%;
    margin: 0;
  }
}
</style>
