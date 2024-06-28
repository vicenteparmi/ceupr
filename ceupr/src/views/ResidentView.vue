<script>
import { getDatabase, ref, get, update, remove } from "@firebase/database";
import ModalDialog from "@/components/ModalDialog.vue";

export default {
  name: "MemberView",
  data() {
    return {
      memberInfo: {
        hours: "",
      },
      reports: [],
      periods: "",
      departments: [],
      showModal: false,
      selectedActivities: "",
    };
  },
  components: {
    ModalDialog,
  },
  mounted() {
    this.getDepartmentsList();
    this.getMemberInfo();
  },
  methods: {
    openModal(activities) {
      this.selectedActivities = activities;
      this.showModal = true;
    },
    async getMemberInfo() {
      const db = getDatabase();
      const memberRef = ref(db, "residents/" + this.$route.params.id);
      get(memberRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            this.memberInfo = {
              name: snapshot.val().name,
              department: snapshot.val().department,
              hours: snapshot.val().hours,
              exempt: snapshot.val().exempt,
              changes: snapshot.val().change
                ? new Date(snapshot.val().change).toLocaleString()
                : "Sem dados",
              exemptReason: snapshot.val().exemptData
                ? snapshot.val().exemptData.reason
                : "",
              exemptStartDate: snapshot.val().exemptData
                ? snapshot.val().exemptData.start
                : "",
              exemptEndDate: snapshot.val().exemptData
                ? snapshot.val().exemptData.end
                : "",
            };

            // Create array with reports
            const reports = snapshot.val().reports;
            for (const report in reports) {
              this.reports.push({
                id: report,
                hours: reports[report].hours,
                activities: reports[report].activities,
                date: reports[report].date,
                department: reports[report].department,
                status: reports[report].status,
                sentBy: reports[report].sentBy,
                obs: reports[report].obs,
              });
            }

            // Get period names
            const settingsRef = ref(db, "settings");
            get(settingsRef).then((snapshot) => {
              if (snapshot.exists()) {
                this.periods = snapshot.val().periods;
                this.currentReport = snapshot.val().currentPeriod;
                this.allowSend = snapshot.val().allowSend;
              }
            });
          } else {
            console.log("No data available");
          }
        })
        .then(() => {
          const departmentRef = ref(
            db,
            "departments/" + this.memberInfo.department
          );
          get(departmentRef).then((snapshot) => {
            if (snapshot.exists()) {
              this.memberInfo.departmentName = snapshot.val().name;
            } else {
              console.log("No data available");
            }
          });
        });
    },
    getDepartmentsList() {
      const db = getDatabase();
      const departmentsRef = ref(db, "departments");
      get(departmentsRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
              this.departments.push({
                id: childSnapshot.key,
                name: childSnapshot.val().name,
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
    saveData() {
      // Confirm save
      if (!confirm("Deseja salvar esta alteração?")) {
        this.getMemberInfo();
        return;
      }

      // Disable all inputs for 1000ms
      document.querySelectorAll("input").forEach((input) => {
        input.disabled = true;
      });
      setTimeout(() => {
        document.querySelectorAll("input").forEach((input) => {
          input.disabled = false;
        });
      }, 500);

      const db = getDatabase();
      const memberRef = ref(db, "residents/" + this.$route.params.id);
      get(memberRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = {
              name: this.memberInfo.name,
              department: this.memberInfo.department,
              hours: this.memberInfo.hours,
              exempt: this.memberInfo.exempt,
              change: Date.now(),
              exemptData: {
                start: this.memberInfo.exemptStartDate,
                end: this.memberInfo.exemptEndDate,
                reason: this.memberInfo.exemptReason,
              },
            };
            update(memberRef, data);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    toggleExempt() {
      // Clear if exempt is true
      if (this.memberInfo.exempt) {
        this.memberInfo.exemptStartDate = "";
        this.memberInfo.exemptEndDate = "";
        this.memberInfo.exemptReason = "";
      }

      this.memberInfo.exempt = !this.memberInfo.exempt;
      this.saveData();
    },
    deleteResident() {
      if (
        prompt(
          'Para confirmar a exclusão, digite "confirmo" e clique em OK. Os dados não poderão ser recuperados.'
        ) != "confirmo"
      ) {
        return;
      }

      const db = getDatabase();
      const memberRef = ref(db, "residents/" + this.$route.params.id);
      get(memberRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            remove(memberRef);
            this.$router.push("/moradores");
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<template>
  <div>
    <transition name="fadeup" mode="out-in">
      <h2 class="title" style="color: var(--tertiary)" v-if="memberInfo.name">
        <span
          class="material-symbols-rounded icon"
          v-on:click="$router.push({ name: 'moradores' })"
        >
          arrow_back_ios_new</span
        >
        {{ memberInfo.name }}
      </h2>
      <div v-else style="width: 80%; height: 65px; margin-bottom: 12px"></div>
    </transition>
    <div class="member__summary">
      <div class="member__summary__chip">
        <h4>Saldo</h4>
        <transition name="fadeup" mode="out-in">
          <span :key="memberInfo.hours">{{
            memberInfo.hours == 1
              ? memberInfo.hours + " hora"
              : memberInfo.hours + " horas"
          }}</span>
        </transition>
      </div>
      <div class="member__summary__chip">
        <h4>Última atualização</h4>
        <transition name="fadeup" mode="out-in">
          <span :key="memberInfo.changes">{{
            memberInfo.changes || ""
          }}</span></transition
        >
      </div>
      <div class="member__summary__chip bad_chip" @click="deleteResident">
        <h4><span class="material-symbols-rounded icon">delete</span></h4>
        <span>Remover morador</span>
      </div>
    </div>

    <!-- Dados do morador -->
    <h3 class="secondary-title">Dados do morador</h3>
    <br />
    <transition name="fadeup" mode="out-in">
      <div class="container resident_data" v-if="memberInfo">
        <div class="input">
          <label for="name">Nome</label>
          <input
            type="text"
            id="name"
            v-model="memberInfo.name"
            @change="saveData"
            autocomplete="off"
          />
        </div>
        <div class="input">
          <label for="department">Departamento</label>
          <select
            id="department"
            v-model="memberInfo.department"
            @change="saveData"
          >
            <option
              v-for="department in departments"
              :value="department.id"
              :key="department.id"
            >
              {{ department.name }}
            </option>
          </select>
        </div>
        <div class="input">
          <label for="exempt_hrs">Horas</label>
          <input
            type="number"
            id="exempt_hrs"
            v-model="memberInfo.hours"
            @focusout="saveData"
            style="width: 100px"
          />
        </div>
      </div>
      <div
        v-else
        class=""
        style="width: 100%; height: 230px; margin-bottom: 24px"
      ></div>
    </transition>

    <!-- Isenção de horas -->
    <h3 class="secondary-title">Isenção de horas</h3>
    <br />
    <transition name="fadeup" mode="out-in">
      <div v-if="memberInfo" class="exempt_section">
        <div
          class="container"
          style="
            justify-content: center;
            align-items: center;
            display: flex;
            flex-direction: column;
          "
        >
          <div class="exempt_container">
            <div class="exempt_icon">
              <span
                class="material-symbols-rounded icon"
                v-if="memberInfo.exempt"
                >history_toggle_off</span
              >
              <span class="material-symbols-rounded icon" v-else>schedule</span>
            </div>
            <div class="exempt_text">
              <h4 v-if="memberInfo.exempt">Isento</h4>
              <h4 v-else>Não isento</h4>
            </div>
          </div>
          <span v-if="memberInfo.exempt" style="width: 100%">
            O morador está isento de cumprir horas
          </span>
          <span v-else style="width: 100%"> O morador deve cumprir horas </span>
          <button
            class="button"
            v-if="!memberInfo.exempt"
            @click="toggleExempt"
            style="
              color: var(--on-primary-container);
              width: 100%;
              border-radius: 8px;
            "
          >
            Marcar como isento
          </button>
          <button
            class="button"
            @click="toggleExempt"
            v-else
            style="
              color: var(--on-primary-container);
              width: 100%;
              border-radius: 8px;
            "
          >
            Retomar cumprimento de horas
          </button>
        </div>
        <div class="container" style="padding: 24px">
          <div class="input">
            <label for="reason">Motivo da isenção</label>
            <input
              type="text"
              id="reason"
              v-model="memberInfo.exemptReason"
              @change="saveData"
            />
          </div>
          <div class="exempt_dates">
            <div class="input">
              <label for="startDate">Data de deliberação</label>
              <input
                type="date"
                id="startDate"
                v-model="memberInfo.exemptStartDate"
                @focusout="saveData"
              />
            </div>
            <div class="input">
              <label for="endDate">Expiração</label>
              <input
                type="date"
                id="endDate"
                v-model="memberInfo.exemptEndDate"
                @focusout="saveData"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-else style="width: 100%; height: 230px; margin-bottom: 24px"></div>
    </transition>

    <!-- Relatórios -->
    <h3 class="secondary-title">Todos os relatórios</h3>
    <table class="table" cellspacing="0" v-if="periods != ''">
      <thead>
        <tr>
          <th>Período</th>
          <th>Data de Envio</th>
          <th>Horas</th>
          <th>Status</th>
          <th>Atividades</th>
          <th>Observações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="report in reports" :key="report.id">
          <td>
            {{ periods[report.id].name + " (" + periods[report.id].year + ")" }}
          </td>
          <td>
            {{
              new Date(report.date).toLocaleDateString() || "Data não informada"
            }}
          </td>
          <td>{{ report.hours }}</td>
          <td>{{ report.status }}</td>
          <td>
            {{
              report.activities && report.activities.length > 30
                ? report.activities.substring(0, 30) + "..."
                : report.activities
            }}
            <br v-if="report.activities && report.activities.length > 30" />
            <span
              v-if="report.activities && report.activities.length > 30"
              @click="openModal(report.activities)"
              class="hover-text"
            >
              Ver tudo
            </span>
          </td>
          <td>{{ report.obs ? report.obs : "-" }}</td>
        </tr>
      </tbody>
    </table>

    <ModalDialog
      v-if="showModal"
      title="Atividades"
      :content="selectedActivities"
      @close="showModal = false"
    />
  </div>
</template>

<style scoped>
.resident_data {
  display: grid;
  grid-template-columns: 3fr 3fr 1fr;
  grid-gap: 24px;
  padding: 24px;
}

.container {
  padding: 24px;
}

.input {
  display: flex;
  flex-direction: column;
  width: 100%;
}

input,
select {
  background-color: transparent;
  color: var(--on-surface);
}

input {
  width: auto;
}

select option {
  color: var(--surface);
}

label {
  font-size: 14px;
  color: var(--secondary);
  margin-bottom: 4px;
}

h3 {
  margin-bottom: 0;
}

.exempt_icon span {
  font-size: 64px;
  color: var(--secondary);
}

.exempt_container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
}

.exempt_text {
  display: flex;
  flex-direction: column;
}

.exempt_text h4 {
  margin-bottom: 0;
  font-size: 24px;
  margin-left: 12px;
}

.exempt_text span {
  font-size: 14px;
  color: var(--secondary);
}

.exempt_section {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 24px;
}

.exempt_dates {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12px;
  margin-top: 12px;
}

.exempt_dates input {
  width: 100%;
  font-family: inherit;
}

.member__summary {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 12px;
  margin-bottom: 12px;
}

.member__summary__chip {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 24px;
  color: var(--primary);
  width: auto;
  border: 1px solid var(--primary);
  margin-right: 12px;
  margin-bottom: 12px;
}

.member__summary__chip h4 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0;
}

.member__summary__chip span {
  font-size: 1.5rem;
  font-weight: 800;
  margin-top: -8px;
}

#report__icon {
  width: 120px;
  height: 120px;
  margin-right: 24px;
}

.member__current__report {
  display: flex;
  flex-direction: row;
  margin-bottom: 24px;
}

.member__current__report > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.button {
  width: fit-content;
  margin-top: 12px;
  margin-right: 0%;
}

.table {
  margin-top: 24px;
}

.chips__holder {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 12px;
}

.chip {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 12px;
  border-radius: 24px;
  color: var(--primary);
  width: auto;
  border: 1px solid var(--primary);
  margin-right: 12px;
  margin-bottom: 12px;
}

.chip span {
  margin-right: 4px;
}

.bad_chip {
  border: 1px solid var(--error);
  color: var(--error);
  cursor: pointer;
}

.bad {
  border-color: var(--error);
  color: var(--error);
}

.hover-text {
  color: var(--primary);
  cursor: pointer;
  text-decoration: none;
  transition: 0.2s;
  shape-outside: none;
}

.hover-text:hover {
  color: var(--primary-dark);
  background-color: var(--primary-light);
}

@media screen and (max-width: 600px) {
  .member__summary {
    margin-top: 24px;
    margin-bottom: 24px;
  }
  .member__summary__chip {
    margin-right: 0px;
    width: 100%;
  }
  .resident_data {
    grid-template-columns: 1fr;
    grid-gap: 12px;
  }
  input {
    margin-bottom: 0;
  }

  .exempt_section {
    grid-template-columns: 1fr;
  }

  .exempt_text {
    max-width: none;
  }

  .container {
    margin-bottom: 0;
  }

  .exempt_dates {
    grid-template-columns: 1fr;
  }
}
</style>
