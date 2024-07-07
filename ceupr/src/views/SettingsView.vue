<script>
import { getDatabase, ref, get, push, update } from "@firebase/database";

export default {
  name: "SettingsView",
  data() {
    return {
      settings: {
        allowSend: false,
        monthHours: 8,
        newPeriodName: "",
        newPeriodYear: "",
        periods: {},
      },
      sendLimit: "",
      currentPeriodId: "",
      toggles: {
        newPeriod: false,
      },
      groupedPeriods: {},
    };
  },
  mounted() {
    this.getSettings();
  },
  watch: {
    sendLimit: function () {
      this.saveInfo();
    },
  },
  methods: {
    toggleNewPeriod(status) {
      if (status) {
        this.toggles.newPeriod = true;
      } else {
        setTimeout(() => {
          this.toggles.newPeriod = false;
        }, 100);
      }
    },
    async getSettings() {
      const db = getDatabase();
      const settingsRef = ref(db, "settings");
      get(settingsRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            this.settings = {
              allowSend: data.allowSend || false,
              monthHours: data.monthHours || 8,
              periods: data.periods || {},
            };
            this.sendLimit = data.sendLimit || "";
            this.currentPeriodId = data.currentPeriod || "";
            this.groupPeriods();
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    groupPeriods() {
      this.groupedPeriods = Object.entries(this.settings.periods).reduce(
        (acc, [id, period]) => {
          if (!acc[period.year]) {
            acc[period.year] = [];
          }
          acc[period.year].push({ id, ...period });
          return acc;
        },
        {}
      );

      console.log(Object.entries(this.groupedPeriods).reverse());
    },
    createPeriod() {
      const db = getDatabase();
      const settingsRef = ref(db, "settings/periods");
      const newPeriod = {
        name: this.settings.newPeriodName,
        year: this.settings.newPeriodYear,
      };

      // Data validation
      if (!newPeriod.name || !newPeriod.year) {
        return;
      } else if (newPeriod.year.length !== 4) {
        alert("O ano deve ter 4 dígitos.");
        return;
      } else if (isNaN(newPeriod.year)) {
        alert("O ano deve ser um número.");
        return;
      } else if (newPeriod.year < 2000) {
        alert("O ano deve ser maior que 2000.");
        return;
      }

      // Check if the period already exists with the same name and year
      const periodExists = Object.values(this.settings.periods).some(
        (period) =>
          period.name === newPeriod.name && period.year === newPeriod.year
      );
      if (periodExists) {
        alert(
          "Um período com o mesmo nome e ano já foi criado na plataforma. Utilize um nome diferente."
        );
        return;
      }

      push(settingsRef, newPeriod).then(() => {
        this.toggleNewPeriod(false);
        this.getSettings();
      });
    },
    saveInfo() {
      const db = getDatabase();
      const settingsRef = ref(db, "settings");
      const newSettings = {
        allowSend: this.settings.allowSend,
        monthHours: this.settings.monthHours,
        currentPeriod: this.currentPeriodId,
        sendLimit: this.sendLimit,
      };
      update(settingsRef, newSettings);
    },
    selectPeriod(periodId) {
      this.currentPeriodId = periodId;
      this.saveInfo();
    },
  },
};
</script>

<template>
  <div>
    <h2 class="title" style="color: var(--tertiary)">
      <span class="material-symbols-rounded icon" v-on:click="$router.go(-1)"
        >arrow_back_ios_new</span
      >
      Configurações de envio
    </h2>
    <div class="settings__toggle__holder">
      <div
        class="setting__toggle"
        :class="{ off: !settings.allowSend }"
        @click="
          settings.allowSend = !settings.allowSend;
          saveInfo();
        "
      >
        <h4>Envio de relatórios</h4>
        <span>{{ settings.allowSend ? "Ativado" : "Desativado" }}</span>
      </div>
      <div class="setting__toggle">
        <h4>Horas mensais</h4>
        <span
          ><input
            style="width: 100px"
            type="number"
            v-model="settings.monthHours"
            @change="saveInfo"
        /></span>
      </div>
      <div class="setting__toggle">
        <h4>Envio até</h4>
        <span>
          <input type="date" style="width: 200px" v-model="sendLimit" />
        </span>
      </div>
    </div>
    <br />
    <h3 class="secondary-title">Gerenciar períodos de envio</h3>
    <p style="max-width: 800px">
      Abaixo estão os períodos criados para envio. Todos acompanham o ano e mês
      (ou ocasião) e após a criação os períodos não podem ser excluídos. Clique
      em um período para selecioná-lo como o período atual.
    </p>
    <div class="settings__toggle__holder">
      <div class="setting__toggle" @click="toggleNewPeriod(true)">
        <h4>
          <span class="material-symbols-rounded icon">add</span>
        </h4>
        <span>Novo período</span>
        <transition name="fade">
          <div class="new__period__form" v-if="toggles.newPeriod">
            <input
              type="text"
              placeholder="Nome do período"
              v-model="settings.newPeriodName"
            />
            <input
              type="text"
              placeholder="Ano"
              v-model="settings.newPeriodYear"
            />
            <button @click="createPeriod">Adicionar</button>
            <button @click="toggleNewPeriod(false)">Cancelar</button>
          </div>
        </transition>
      </div>
    </div>
    <!-- Divide by year, showing the most recent first -->
    <div
      v-for="(periods, year) in Object.entries(groupedPeriods).reverse()"
      :key="year"
      class="year-group"
    >
      <h3>
        <!-- Get the first element of the map -->
        {{ periods[0] }}
      </h3>
      <div class="settings__toggle__holder">
        <div
          class="setting__toggle off fade"
          :class="{ selected: period.id === currentPeriodId }"
          v-for="period in periods[1]"
          :key="period.id"
          @click="selectPeriod(period.id)"
        >
          <h4>{{ period.name }}</h4>
          <span>{{ period.year }}</span>
        </div>
      </div>
    </div>

    <!-- <div
      v-for="(periods, year) in groupedPeriods"
      :key="year"
      class="year-group"
    >
      <h3>{{ year }}</h3>
      <div class="settings__toggle__holder">
        <div
          class="setting__toggle off fade"
          :class="{ selected: period.id === currentPeriodId }"
          v-for="period in periods"
          :key="period.id"
          @click="selectPeriod(period.id)"
        >
          <h4>{{ period.name }}</h4>
          <span>{{ period.year }}</span>
        </div>
      </div>
    </div> -->
  </div>
</template>

<style>
.settings__toggle__holder {
  display: flex;
  flex-direction: row;
  margin-top: 24px;
  flex-wrap: wrap;
  align-items: flex-start;
}

.setting__toggle {
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 24px;
  border-radius: 24px;
  background-color: var(--primary-container);
  width: fit-content;
  color: var(--on-primary-container);
  transition-duration: 0.1s;
  user-select: none;
  margin: 0 12px 12px 0;
  border: 1px solid var(--primary);
  cursor: pointer;
}

.setting__toggle > h4 {
  font-size: 16px;
  font-weight: normal;
}

.setting__toggle > span {
  font-size: 24px;
  font-weight: 800;
}

.setting__toggle:hover {
  background-color: var(--on-primary);
}

.off {
  background-color: transparent;
  color: var(--secondary);
  border: 1px solid var(--secondary);
}

.off:hover {
  background-color: transparent;
  border: 1px solid var(--secondary);
  box-shadow: 0px 0px 0px 1px var(--secondary);
}

.selected {
  background-color: var(--secondary);
  color: var(--on-secondary);
  border: 1px solid var(--secondary);
}

.selected:hover {
  background-color: var(--secondary);
}

input {
  border: 1px solid var(--primary);
  background-color: transparent;
  color: var(--on-primary-container);
  font-size: 24px;
  font-weight: 800;
  text-align: left;
  outline: none;
}

.new__period__form {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 400px;
}

.new__period__form > input {
  width: 100%;
  margin: 8px 0;
}

.new__period__form > button {
  width: 100%;
  margin: 8px 0;
  background-color: var(--primary);
  color: var(--on-primary);
  border: none;
  border-radius: 8px;
  padding: 8px;
  font-size: 16px;
  font-weight: 800;
  transition-duration: 0.1s;
}

.new__period__form > button:hover {
  background-color: var(--on-primary-container);
  color: var(--primary-container);
  cursor: pointer;
}

.fade {
  animation-name: fade;
  animation-duration: 0.2s;
}

@keyframes fade {
  from {
    opacity: 0;
    transform: translateX(10px);
  }

  to {
    opacity: 1;
  }
}

.year-group {
  margin-top: 24px;
}

.year-group > h3 {
  color: var(--secondary);
  margin-bottom: 12px;
}

@media screen and (max-width: 600px) {
  .setting__toggle {
    width: 100%;
    margin: 0 0 12px 0;
  }
}
</style>
