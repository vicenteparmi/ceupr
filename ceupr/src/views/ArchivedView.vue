<script setup>
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import router from "../router";
</script>

<script>
export default {
  name: "ArchivedView",
  mounted() {
    // Update list when auth state changes
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.updateList();
      } else {
        router.push("inicio");
      }
    });
  },
  data() {
    return {
      residents: [],
      residents_temp: [],
      departments: [],
      addResidentOpen: false,
      searchBoxContent: "",
      searchStorage: [],
      chips: [],
      selectedDepartment: "all",
      editResidentFields: {
        name: "",
        department: "",
        hours: 0,
        exempt: false,
      },
    };
  },
  methods: {
    async getResidents() {
      const db = getDatabase();
      const residents = [];
      const residentsRef = ref(db, "archived_residents");
      get(residentsRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          for (const resident in data) {
            residents.push({
              name: data[resident].name,
              department: data[resident].department,
              id: resident,
              hours: data[resident].hours,
              exempt: data[resident].exempt,
            });
          }
        } else {
          console.log("No data available");
        }
      });
      return residents;
    },
    async getDepartments() {
      const db = getDatabase();
      const departments = [];
      const departmentsRef = ref(db, "departments");
      get(departmentsRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          for (const department in data) {
            departments.push({
              name: data[department].name,
              id: department,
            });
          }
        } else {
          console.log("No data available");
        }
      });
      return departments;
    },
    updateList() {
      console.log("Updating list");
      if (this.departments.length == 0) {
        this.getDepartments().then((departments) => {
          this.departments = departments;
        });
      }
      this.getResidents().then((residents) => {
        this.residents = residents;
        console.log("Residents updated");
        console.log(this.residents);
      });

      // Buggy code, fix it later
      const interval = setInterval(() => {
        this.residents_temp = [...this.residents];
        this.residents = [];
        this.$nextTick(() => {
          this.residents = [...this.residents_temp];
          if (this.searchStorage == []) {
            this.searchStorage = [...this.residents_temp];
          }
          this.filterSearch();
        });
      }, 1000);
      setTimeout(() => {
        clearInterval(interval);
      }, 10000);
    },
    getDepartmentName(id) {
      for (const department of this.departments) {
        if (department.id == id) {
          return department.name;
        }
      }
    },
    filterSearch(data, mode) {
      // Define variables
      switch (mode) {
        case "department":
          this.selectedDepartment = data;
          break;
        case "term":
          this.searchBoxContent = data;
          break;
      }

      // Filter residents by search
      this.searchStorage = this.residents.filter((resident) => {
        return resident.name
          .toLowerCase()
          .includes(this.searchBoxContent.toLowerCase());
      });

      // Filter residents by department
      this.searchStorage = this.searchStorage.filter((resident) => {
        if (
          resident.department == this.selectedDepartment ||
          this.selectedDepartment == "" ||
          this.selectedDepartment == "all"
        ) {
          return true;
        }
      });

      // Filter residents by chips
      this.searchStorage = this.searchStorage.filter((resident) => {
        let returnStorage = [];
        if (this.chips.includes("debt")) {
          if (resident.hours < 0) {
            returnStorage.push(false);
          }
        }

        if (this.chips.includes("exempt")) {
          if (resident.exempt) {
            returnStorage.push(false);
          }
        }

        if (
          (returnStorage.includes(false) &&
            returnStorage.length == this.chips.length) ||
          this.chips.length == 0
        ) {
          return true;
        } else {
          return false;
        }
      });
    },
    toggleChip(chip) {
      // Toggle chip
      if (this.chips.includes(chip)) {
        this.chips.splice(this.chips.indexOf(chip), 1);
      } else {
        this.chips.push(chip);
      }
      this.filterSearch();
    },
    openResident(residentId) {
      router.push({ name: "archived_resident", params: { id: residentId } });

      // const resident = this.residents.find((res) => {
      //   return res.id == residentId;
      // });

      // this.editResidentFields = {
      //   name: resident.name ? resident.name : "",
      //   department: resident.department ? resident.department : "",
      //   hours: resident.hours ? resident.hours : 0,
      //   exempt: resident.exempt ? resident.exempt : false,
      //   id: resident.id,
      // };

      // this.addResidentOpen = true;
    },
  },
};
</script>

<template>
  <div>
    <h2 class="title" style="color: var(--tertiary)">
      <span
        class="material-symbols-rounded icon"
        v-on:click="$router.push('gerenciamento')"
      >
        arrow_back_ios_new</span
      >
      Moradores arquivados
    </h2>
    <h4 class="subtitle" style="color: var(--tertiary)">
      Moradores que não estão mais ativos na plataforma
    </h4>
    <div id="residents__content">
      <div style="grid-area: filter">
        <div class="filter__container">
          <div class="filter__input flex_row">
            <input
              type="text"
              placeholder="Digite o nome do morador para pesquisar"
              :value="searchBoxContent"
              v-on:input="filterSearch($event.target.value, 'term')"
            />
            <span
              class="material-symbols-rounded icon"
              v-on:click="(searchBoxContent = ''), filterSearch()"
            >
              close</span
            >
          </div>
          <div class="filter__chips">
            <!-- Select department -->
            <select
              :value="selectedDepartment"
              v-on:change="filterSearch($event.target.value, 'department')"
              style="margin-right: 10px"
            >
              <option value="all">Todos os departamentos</option>
              <option
                v-for="department in departments"
                :key="department.id"
                :value="department.id"
              >
                {{ department.name }}
              </option>
            </select>
            <div
              class="filter__chip"
              :class="{ select: chips.includes('debt') }"
              v-on:click="toggleChip('debt')"
            >
              <span class="material-symbols-rounded icon"
                >history_toggle_off
              </span>
              <span>Devendo horas</span>
            </div>
            <div
              class="filter__chip"
              :class="{ select: chips.includes('exempt') }"
              v-on:click="toggleChip('exempt')"
            >
              <span class="material-symbols-rounded icon">hourglass_empty</span>
              <span>Isento</span>
            </div>
          </div>
          <p class="filter__result__count">
            Sua pesquisa retornou
            {{ searchStorage.length }}
            {{ searchStorage.length == 1 ? "resultado" : "resultados" }}.
          </p>
        </div>
      </div>
      <table style="grid-area: content" class="table" cellspacing="0">
        <thead>
          <tr>
            <th style="width: 45%">Nome</th>
            <th style="width: 35%">Departamento</th>
            <th style="width: 10%">Horas</th>
            <th style="width: 10%">Isento</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="resident in searchStorage"
            :key="resident.id"
            class="resident"
            v-on:click="openResident(resident.id)"
          >
            <td>{{ resident.name }}</td>
            <td>{{ getDepartmentName(resident.department) }}</td>
            <td
              style="text-align: center"
              :class="{
                negative: resident.hours < 0,
                positive: resident.hours > 0,
              }"
            >
              {{ resident.hours }}
            </td>
            <td style="text-align: center">
              <span class="material-symbols-rounded icon" v-if="resident.exempt"
                >done_outline</span
              >
            </td>
          </tr>
          <tr v-if="searchStorage.length == 0">
            <td colspan="4" style="text-align: center">
              Nenhum morador arquivado encontrado
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
#residents__content {
  display: block;
  row-gap: 24px;
  margin-top: 24px;
  margin-bottom: 24px;
}

#residents__content > div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  border-radius: 24px;
  border: solid 1px var(--secondary-container);
  margin-bottom: 24px;
}

.flex_row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.filter__input {
  width: 100%;
}

.filter__input > input {
  width: 98%;
  font-size: 16px;
  padding: 12px 24px;
  margin-right: 2%;
  border-radius: 24px;
  border: solid 1px var(--secondary-container);
  background-color: var(--background);
}

.filter__input > input:focus {
  border: solid 1px var(--tertiary);
}

.filter__input > input::placeholder {
  color: var(--secondary);
  opacity: 0.5;
  font-family: "Inter", sans-serif;
}

.filter__input > .icon {
  color: var(--secondary);
  font-size: 24px;
  cursor: pointer;
}

select {
  width: auto;
  font-size: 14px;
  padding: 4px 8px;
  margin-right: 2%;
  border-radius: 24px;
  border: solid 1px var(--secondary-container);
  background-color: var(--background);
  color: var(--secondary);
  font-weight: 500;
}

select:focus {
  border: solid 1px var(--tertiary);
}

option {
  font-size: 16px;
  padding: 12px 24px;
  margin-right: 2%;
  border-radius: 24px;
  border: solid 1px var(--secondary-container);
  background-color: var(--background);
}

.filter__chips {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
  user-select: none;
}

.filter__chip {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 12px 4px 8px;
  border-radius: 24px;
  border: solid 1px var(--secondary-container);
  color: var(--secondary);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition-duration: 0.1s;
}

.filter__chip.select {
  color: var(--primary);
  background-color: var(--primary-container);
}

.filter__chip > span {
  margin-left: 4px;
}

.filter__chip > .material-symbols-rounded {
  font-size: 16px;
}

.filter__container {
  width: 100%;
}

.filter__result__count {
  font-size: 12px;
  font-weight: 200;
  color: var(--secondary);
  margin: 12px 0 0 0;
  font-style: italic;
}

@media only screen and (max-width: 600px) {
  #residents__content {
    grid-template-areas: "filter" "new" "content";
  }
}

/* Add residents migration */

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

.alert {
  background-color: var(--error-container);
  color: var(--error);
  border: solid 1px var(--on-error);
}

.alert:hover {
  background-color: var(--on-error);
}
</style>
