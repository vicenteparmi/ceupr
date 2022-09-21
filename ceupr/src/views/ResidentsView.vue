<script setup>
import { getDatabase, ref, get } from "firebase/database";
</script>

<script>
// Get all residents from the database

// Assign department to resident

// Inflate the resident list with the department names

// Export data

export default {
  name: "ResidentsView",
  mounted() {
    const db = getDatabase();

    async function getResidents() {
      const residents = [];
      const residentsRef = ref(db, "residents");
      get(residentsRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          for (const resident in data) {
            residents.push({
              name: data[resident].name,
              department: data[resident].department,
              id: resident,
              hours: data[resident].hours,
            });
          }
        } else {
          console.log("No data available");
        }
      });
      return residents;
    }

    getResidents().then((residents) => {
      this.residents = residents;
      console.log(residents);
    });
  },
  data() {
    return {
      residents: [],
    };
  },
};
</script>

<template>
  <div>
    <h2 class="title" style="color: var(--tertiary)">Moradores</h2>
    <h4 class="subtitle" style="color: var(--tertiary)">
      Gerenciamento dos moradores da CEU
    </h4>
    <div id="residents__content">
      <div style="grid-area: filter">
        <div class="filter__container">
          <div class="filter__input flex_row">
            <input
              type="text"
              placeholder="Digite o nome do morador para pesquisar"
              v-model="search"
            />
            <span class="material-symbols-rounded icon">close</span>
          </div>
          <div class="filter__chips">
            <div class="filter__chip">
              <span class="material-symbols-rounded icon">live_help</span>
              <span>Sem departamento</span>
            </div>
            <div class="filter__chip select">
              <span class="material-symbols-rounded icon"
                >history_toggle_off
              </span>
              <span>Devendo horas</span>
            </div>
            <div class="filter__chip">
              <span class="material-symbols-rounded icon">hourglass_empty</span>
              <span>Isento</span>
            </div>
          </div>
        </div>
      </div>
      <div style="grid-area: new" class="filter__add__person">
        <span class="material-symbols-rounded icon">person_add</span>
        <span>Adicionar<br />morador</span>
      </div>
      <table style="grid-area: content" class="filter__content">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Departamento</th>
            <th>Horas</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="resident in residents" :key="resident.id" class="resident">
            <td>{{ resident.name }}</td>
            <td>{{ resident.department }}</td>
            <td>{{ resident.hours }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
#residents__content {
  display: grid;
  row-gap: 24px;
  column-gap: 24px;
  grid-template-areas: "filter filter filter filter new" "content content content content content";
  margin-top: 24px;
}

#residents__content > div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  border-radius: 24px;
  border: solid 1px var(--secondary-container);
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

#residents__content > .filter__add__person {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--secondary);
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  line-height: normal;
  transition-duration: 0.2s;
  font-weight: bold;
}

#residents__content > .filter__add__person:hover {
  color: var(--primary);
  background-color: var(--primary-container);
  border-radius: 12px;
  border: solid 1px var(--primary);
}

#residents__content > .filter__add__person > .material-symbols-rounded {
  margin-bottom: 8px;
}

/* Table with all residents */

.filter__content {
  width: 100%;
  border-radius: 24px;
  overflow: hidden;
  border: solid 1px var(--secondary-container);
  border-collapse: collapse;
}

.filter__content > thead > tr > th {
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  color: var(--on-primary-container);
  text-align: left;
  border-bottom: solid 1px var(--secondary-container);
  background-color: var(--primary-container);
}

.filter__content > tbody > tr > td {
  padding: 12px 24px;
  font-size: 16px;
  color: var(--secondary);
  border-bottom: solid 1px var(--secondary-container);
}
</style>
